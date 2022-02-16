import apolloServer from 'apollo-server-express'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from "../../models/UserModel.js";
import Transaction from "../../models/TransactionModel.js";

import { authenticate, getDate, createAccountId } from '../helpers/index.js';

const { AuthenticationError } = apolloServer

const Mutation = {
    createUser: async (_, args) => {
        const user = args.user;

        const accountId = createAccountId(user);
        user.accountID = accountId;

        try {
            const newUser = await new User(user);
            const savedUser = await newUser.save();

            if (!savedUser) {
                throw ("user could not be created");
            }

            return savedUser;
        } catch (err) {
            return err.message;
        }
    },

    deleteUser: async (_, args) => {
        const { user } = args;
        const { email, password } = user;

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

    updateUser: async (_, args) => {
        const { user } = args;
        const {
            name,
            surname,
            password,
            email,
            phoneNumber,
            currency,
            newEmail,
        } = user;

        try {
            const thisUser = await User.findOneAndUpdate({
                email: email
            }, {
                name: name && name,
                surname: surname && surname,
                password: password && password,
                phoneNumber: phoneNumber && phoneNumber,
                currency: currency && currency,
                newEmail: newEmail && newEmail
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

        const { transaction, auth } = args;
        const { personId, name, sum, isLoan, currency, date } = transaction;

        if (!auth) {
            throw ('You do no have a permition to delete transaction')
        }

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

        const { transaction, auth } = args;
        const { id } = transaction;

        if (!auth) {
            throw ('You do no have a permition to delete transaction')
        }

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
        const { transaction, auth } = args;
        const {
            category,
            sum,
            date,
            isLoan,
            name,
            id
        } = transaction;

        authenticate(context, args)

        if (!auth) {
            throw ('You do no have a permition to delete transaction')
        }

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
        //* solve password

        const { user } = args;
        const userExist = await User.find({ email: user.email });
        if (!userExist) {
            throw new AuthenticationError("Email or Password is wrong!")
        }

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
}

export default Mutation