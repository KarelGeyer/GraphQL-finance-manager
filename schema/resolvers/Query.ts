import User from "../../models/UserModel.js";
import Transaction from "../../models/TransactionModel.js";

import { authenticate, formatDate } from "../helpers/index.js";
import {
  BaseTransaction,
  BaseUser,
  CompleteUser,
  Context,
} from "../../types/index";

const Query = {
  //* User Queries
  users: async (): Promise<BaseUser[]> => {
    const users: BaseUser[] = await User.find();

    return users;
  },

  user: async (_: any, args: BaseUser): Promise<BaseUser | null> => {
    const { email } = args;
    const user: BaseUser | null = await User.findOne({ email: email });

    return user;
  },

  //* Transaction Queries
  transactionsAll: async (
    _: any,
    args: any,
    context: Context
  ): Promise<BaseTransaction[]> => {
    authenticate(context, args);

    const transactions: BaseTransaction[] = await Transaction.find();

    return transactions;
  },

  transactionsByMonth: async (
    _: any,
    args: any,
    context: Context
  ): Promise<BaseTransaction[]> => {
    authenticate(context, args);

    const date: string = args.date;

    const transactions: BaseTransaction[] = await Transaction.find();
    const filteredTransactions: BaseTransaction[] = transactions.filter(
      (transaction) => {
        const userDate = formatDate("month", date);

        return formatDate("month", transaction.date) === userDate;
      }
    );

    return filteredTransactions;
  },

  transactionsByDay: async (_: any, args: any, context: Context) => {
    authenticate(context, args);

    const date = args.date;
    // @ts-ignore
    const transactions: BaseTransaction = await Transaction.find().byDay(date);

    return transactions;
  },

  transaction: async (
    _: any,
    args: any,
    context: Context
  ): Promise<BaseTransaction | null> => {
    authenticate(context, args);

    const { id } = args;
    const transaction: BaseTransaction | null = await Transaction.findById(id);

    return transaction;
  },

  //* Loans Queries
  loans: async (
    _: any,
    args: any,
    context: Context
  ): Promise<BaseTransaction[]> => {
    authenticate(context, args);

    const transactions: BaseTransaction[] = await Transaction.find();
    const loans = transactions.filter((loan) => {
      return loan.isLoan === true;
    });

    return loans;
  },

  loansByMonth: async (
    _: any,
    args: any,
    context: Context
  ): Promise<BaseTransaction[]> => {
    authenticate(context, args);

    const date = args.date;

    const transactions: BaseTransaction[] = await Transaction.find();
    const filteredTransactions = transactions.filter((transaction) => {
      const userDate = formatDate("month", date);

      return formatDate("month", transaction.date) === userDate;
    });

    const filteredLoans = filteredTransactions.filter((loan) => {
      return loan.isLoan === true;
    });

    return filteredLoans;
  },
};

export default Query;
