import apolloServer from 'apollo-server-express'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from "../../models/UserModel.js";
import Transaction from "../../models/TransactionModel.js";

import { authenticate, getDate, createAccountId, validate } from '../helpers/index.js';

const { AuthenticationError } = apolloServer

const Mutation = {
    createUser: async (_, args) => {
        const user = args.user;

        const accountId = createAccountId(user);
        user.accountID = accountId;

        const saltRounds = 10;
        const password = await bcrypt.hash(user.password, saltRounds)

        if (!password) {
            throw ("Something went wrong, please try again later or contact the admin #userCreation #1")
        }
        user.password = password;

        if (!user.currency) {
            user.currency = "EUR"
        }

        try {
            const newUser = await new User(user);
            const savedUser = await newUser.save();

            if (!savedUser) {
                throw ("user could not be created #userCreation #2");
            }

            return savedUser;
        } catch (err) {
            return err.message;
        }
    },

    deleteUser: async (_, args, context) => {
        const { user } = args;
        const { email } = user;

        authenticate(context, args);
        await validate(user);

        try {
            const thisUser = await User.findOneAndDelete({
                email: email
            });

            if (!thisUser) {
                throw ("user could not be deleted")
            }

            if (!thisUser.teamID) {
                const accountId = thisUser.accountID.toString()
                const transactions = await Transaction.find().where("personId").equals(accountId);
                const deletedTransaction = await Transaction.deleteMany({ personId: accountId })

                if (transactions && !deletedTransaction) {
                    throw ("Transactions bound to this account could not be deleted, please try again")
                }
            }

            return thisUser;
        } catch (err) {
            return err.message;
        }
    },

    updateUser: async (_, args, context) => {
        const { user } = args;
        const {
            name,
            surname,
            password,
            email,
            phoneNumber,
            currency,
            newPassword,
            newEmail,
        } = user;

        authenticate(context, args);
        await validate(user);

        const saltRounds = 10;
        const changedPassword = newPassword ? await bcrypt.hash(newPassword, saltRounds) : password

        try {
            const thisUser = await User.findOneAndUpdate({
                email: email
            }, {
                name: name && name,
                surname: surname && surname,
                phoneNumber: phoneNumber && phoneNumber,
                currency: currency && currency,
                newEmail: newEmail && newEmail,
                password: changedPassword
            });

            if (!thisUser) {
                throw ("Something went wrong");
            }

            return thisUser;
        } catch (err) {
            return err.message;
        }
    },



    createTransaction: async (_, args, context) => {
        authenticate(context, args)

        const { transaction } = args;
        const { personId, name, sum, isLoan, currency, date } = transaction;


        if (!personId || !name || !sum) {
            throw ("Transaction could not be saved, error #1");
        }

        if (!isLoan) {
            transaction.isLoan = false;
        }

        if (!currency) {
            transaction.currency = "EUR";
        }

        if (!date) {
            getDate(transaction, 'Transaction')
        }

        try {
            const newTransaction = await new Transaction(transaction);
            const saveTransaction = await newTransaction.save();

            if (!saveTransaction) {
                throw ("Transaction could not be saved, error #2");
            }

            return saveTransaction;
        } catch (err) {
            return err.message;
        }
    },

    deleteTransaction: async (_, args, context) => {
        authenticate(context, args)

        const { transaction } = args;
        const { id } = transaction;

        try {
            const deletedTransaction = await Transaction.findByIdAndDelete({ _id: id });

            if (!deletedTransaction) {
                throw ("Transaction could not be deleted");
            }

            return deletedTransaction;
        } catch (err) {
            return err.message;
        }
    },

    updateTransaction: async (_, args, context) => {
        const { transaction } = args;
        const {
            category,
            sum,
            date,
            isLoan,
            name,
            id
        } = transaction;

        authenticate(context, args)

        try {
            const updatedTransaction = await Transaction.findByIdAndUpdate({
                _id: id
            }, {
                category: category && category,
                sum: sum && sum,
                date: date && date,
                isLoan: isLoan && isLoan,
                name: name && name,
            })

            if (!updatedTransaction) {
                throw ("Transaction could not be updated");
            };

            return updatedTransaction;
        } catch (err) {
            return err.message;
        }
    },



    login: async (_, args) => {
        const { user } = args;

        await validate(user);

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

        const updatedUser = await User.findOneAndUpdate({
            email: user.email
        }, {
            refreshToken: refreshToken
        });

        if (!updatedUser) {
            throw ('Email or Password are wrong! Please try again or contact the admin')
        }

        return accessToken
    },

    refreshToken: async (_, args) => {
        const { email } = args.user
        const user = await User.find({ email: email })
        if (!user) {
            throw ('No user was found')
        }

        const { refreshToken } = user[0]
        if (!refreshToken) {
            throw ('No refresh token was found')
        }

        let accessToken;
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                throw new AuthenticationError("User must be signed in, invalid token");
            }

            const newAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });

            accessToken = newAccessToken;
        })

        return accessToken;
    },

    createTeamId: async (_, args) => {
        const { users } = args;
        const { accountIDFirstUser, accountIDSecondUser } = users;

        const teamID = `${accountIDFirstUser}-${accountIDSecondUser}`

        const updateFirstUser = await User.findOneAndUpdate({
            accountID: accountIDFirstUser
        }, {
            teamID: teamID
        })

        if (!updateFirstUser) {
            throw ('Something went wrong, please try again or contant the admin #1')
        }

        const updateSecondUser = await User.findOneAndUpdate({
            accountID: accountIDSecondUser
        }, {
            teamID: teamID
        })

        if (!updateSecondUser) {
            throw ('Something went wrong, please try again or contant the admin #2')
        }

        return teamID
    }
}

export default Mutation