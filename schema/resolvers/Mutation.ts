import apolloServer from "apollo-server-express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../../models/UserModel.js";
import Transaction from "../../models/TransactionModel.js";
import Loan from "../../models/LoanModel.js";

import {
  authenticate,
  getDate,
  createAccountId,
  validate,
} from "../helpers/index.js";

import {
  BaseUser,
  CompleteUser,
  UpdateUser,
  Context,
  TeamIDCreation,
  BaseTransaction,
  Credentials,
  RefreshToken,
  BaseLoan,
} from "../../types/index";

const { AuthenticationError } = apolloServer;

const Mutation = {
  createUser: async (
    _: any,
    args: { user: CompleteUser }
  ): Promise<CompleteUser> => {
    const user: CompleteUser = args.user;

    const accountId = createAccountId(user);
    user.accountID = accountId;

    const saltRounds = 10;
    const password = await bcrypt.hash(user.password, saltRounds);

    if (!password) {
      throw "Something went wrong, please try again later or contact the admin #userCreation #1";
    }

    user.password = password;

    if (!user.currency) {
      user.currency = "EUR";
    }

    try {
      const newUser: BaseUser = await new User(user);
      const savedUser = await newUser.save();

      if (!savedUser) {
        throw "user could not be created #userCreation #2";
      }

      return savedUser;
    } catch (err) {
      return err.message;
    }
  },

  deleteUser: async (
    _: any,
    args: { user: CompleteUser },
    context: Context
  ): Promise<CompleteUser> => {
    const { user } = args;
    const { email } = user;

    authenticate(context, args);
    await validate(user);

    try {
      const thisUser: CompleteUser | null = await User.findOneAndDelete({
        email: email,
      });

      if (!thisUser) {
        throw "user could not be deleted";
      }

      if (!thisUser.teamID) {
        const accountId = thisUser.accountID.toString();
        const transactions: BaseTransaction[] | null = await Transaction.find()
          .where("personId")
          .equals(accountId);
        const deletedTransaction = await Transaction.deleteMany({
          personId: accountId,
        });

        if (transactions && !deletedTransaction) {
          throw "Transactions bound to this account could not be deleted, please try again";
        }
      }

      return thisUser;
    } catch (err) {
      return err.message;
    }
  },

  updateUser: async (
    _: any,
    args: { user: UpdateUser },
    context: Context
  ): Promise<CompleteUser> => {
    const { user } = args;
    const {
      name,
      surname,
      email,
      phoneNumber,
      currency,
      newPassword,
      newEmail,
    } = user;

    authenticate(context, args);
    await validate(user);

    const currentUser = await User.findOne({ email: email });

    if (!currentUser) {
      throw "User was not found";
    }

    const saltRounds = 10;

    const changedPassword =
      newPassword && (await bcrypt.hash(newPassword, saltRounds));

    if (newEmail) {
      const existingUser = await User.findOne({
        email: newEmail,
      });

      if (existingUser) {
        console.log(existingUser);
        throw "This user already exist, please type in a new email";
      }
    }

    try {
      const thisUser: CompleteUser | null = await User.findOneAndUpdate(
        {
          email: email,
        },
        {
          name: name && name,
          surname: surname && surname,
          phoneNumber: phoneNumber && phoneNumber,
          currency: currency && currency,
          email: newEmail !== "" ? newEmail : currentUser.email,
          password:
            changedPassword && changedPassword !== ""
              ? changedPassword
              : currentUser.password,
        }
      );

      if (!thisUser) {
        throw "Something went wrong";
      }

      console.log(user);
      return thisUser;
    } catch (err) {
      return err.message;
    }
  },

  createTransaction: async (
    _: any,
    args: { transaction: BaseTransaction },
    context: Context
  ): Promise<BaseTransaction> => {
    authenticate(context, args);

    const { transaction } = args;
    const { name, sum, currency, date } = transaction;

    if (!name || !sum) {
      throw "Transaction could not be saved, error #1";
    }

    if (!currency) {
      transaction.currency = "EUR";
    }

    if (!date) {
      getDate(transaction, "Transaction");
    }

    try {
      const newTransaction: BaseTransaction = await new Transaction(
        transaction
      );

      const saveTransaction = await newTransaction.save();

      if (!saveTransaction) {
        throw "Transaction could not be saved, error #2";
      }

      return saveTransaction;
    } catch (err) {
      return err.message;
    }
  },

  deleteTransaction: async (
    _: any,
    args: { transaction: BaseTransaction },
    context: Context
  ): Promise<BaseTransaction> => {
    authenticate(context, args);

    const { transaction } = args;
    const { id } = transaction;

    try {
      const deletedTransaction: BaseTransaction | null =
        await Transaction.findByIdAndDelete({
          _id: id,
        });

      if (!deletedTransaction) {
        throw "Transaction could not be deleted";
      }

      return deletedTransaction;
    } catch (err) {
      return err.message;
    }
  },

  updateTransaction: async (
    _: any,
    args: { transaction: BaseTransaction },
    context: Context
  ): Promise<BaseTransaction> => {
    const { transaction } = args;
    const { category, sum, date, name, currency, id } = transaction;

    authenticate(context, args);

    try {
      const updatedTransaction: BaseTransaction | null =
        await Transaction.findByIdAndUpdate(
          {
            _id: id,
          },
          {
            category: category && category,
            sum: sum && sum,
            date: date && date,
            name: name && name,
            currency: currency && currency,
          }
        );

      if (!updatedTransaction) {
        throw "Transaction could not be updated";
      }

      return updatedTransaction;
    } catch (err) {
      return err.message;
    }
  },

  createLoan: async (
    _: any,
    args: { loan: BaseLoan },
    context: Context
  ): Promise<BaseLoan> => {
    authenticate(context, args);

    const { loan }: { loan: BaseLoan } = args;
    const { name, sum, currency, date, creditorEmail, debtorEmail } = loan;

    if (!name || !sum) {
      throw "Loan could not be saved, error #1";
    }

    if (debtorEmail == "") {
      throw "Debtor could not be found, error #1";
    }

    if (creditorEmail === "") {
      throw "Loan could not be saved, isLoan was marked but no credtior was provided to connect this transaction to";
    }

    if (!currency) {
      loan.currency = "EUR";
    }

    if (!date) {
      getDate(loan, "Loan");
    }

    try {
      const newLoan: BaseLoan = await new Loan(loan);

      const saveLoan = await newLoan.save();

      if (!saveLoan) {
        throw "Transaction could not be saved, error #2";
      }

      return saveLoan;
    } catch (err) {
      return err.message;
    }
  },

  deleteLoan: async (
    _: any,
    args: { id: string },
    context: Context
  ): Promise<BaseLoan> => {
    authenticate(context, args);

    const { id } = args;

    try {
      const deletedLoan: BaseLoan | null = await Loan.findByIdAndDelete({
        _id: id,
      });

      if (!deletedLoan) {
        throw "Transaction could not be deleted";
      }

      return deletedLoan;
    } catch (err) {
      return err.message;
    }
  },

  updateLoan: async (
    _: any,
    args: { loan: BaseLoan },
    context: Context
  ): Promise<BaseLoan> => {
    const { loan }: { loan: BaseLoan } = args;
    const { id, sum, currency, date, isPayed } = loan;

    authenticate(context, args);

    try {
      const updatedLoan: BaseLoan | null = await Loan.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          sum: sum && sum,
          date: date && date,
          currency: currency && currency,
          isPayed: isPayed && isPayed,
        }
      );

      if (!updatedLoan || updatedLoan == null) {
        throw "Transaction could not be updated";
      }

      return updatedLoan;
    } catch (err) {
      return err.message;
    }
  },

  login: async (_: any, args: { user: BaseUser }): Promise<RefreshToken> => {
    const { user } = args;
    await validate(user);

    const refreshToken = jwt.sign(
      user,
      process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : "",
      {
        expiresIn: "1h",
      }
    );

    const updatedUser: CompleteUser | null = await User.findOneAndUpdate(
      {
        email: user.email,
      },
      {
        refreshToken: refreshToken,
      }
    );

    if (!updatedUser) {
      throw "Email or Password are wrong! Please try again or contact the admin";
    }

    return {
      refreshToken,
    };
  },

  refreshToken: async (_: any, args: { email: String }): Promise<string> => {
    const { email } = args;
    const user: CompleteUser[] = await User.find({ email: email });

    if (!user) {
      throw "No user was found";
    }

    const { refreshToken } = user[0];
    if (!refreshToken) {
      throw "No refresh token was found";
    }

    let accessToken: string;

    jwt.verify(
      refreshToken,
      process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : "",
      (err: any, user: any) => {
        if (err) {
          throw new AuthenticationError(
            "User must be signed in, invalid token"
          );
        }

        const newAccessToken = jwt.sign(
          user,
          process.env.REFRESH_TOKEN_SECRET
            ? process.env.REFRESH_TOKEN_SECRET
            : ""
        );

        accessToken = newAccessToken;
      }
    );

    await User.findOneAndUpdate(
      {
        email,
      },
      {
        refreshToken: refreshToken,
      }
    );

    // @ts-ignore
    return {
      refreshToken,
    };
  },

  createTeamId: async (
    _: any,
    args: { userEmails: TeamIDCreation[]; teamId: string }
  ): Promise<string> => {
    const { userEmails, teamId } = args;

    if (!teamId) throw "Team Id is missing";

    if (userEmails.length < 2)
      throw "Not enough user email provided in order to create a team";

    userEmails.forEach(async (email) => {
      await User.findOneAndUpdate(
        {
          email: email,
        },
        {
          teamID: teamId,
        }
      );
    });

    return teamId;
  },
};

export default Mutation;
