import User from "../../models/UserModel.js";
import Transaction from "../../models/TransactionModel.js";
import Loan from "../../models/LoanModel.js";

import { authenticate, formatDate } from "../helpers/index.js";
import {
  BaseLoan,
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

  teamTransactions: async (
    _: any,
    args: any,
    context: Context
  ): Promise<any[] | null> => {
    const { ids } = args;

    const transactions = await Transaction.find({ personId: { $in: ids } });

    return transactions;
  },

  //* Loans Queries
  loansAll: async (_: any, args: any, context: Context): Promise<any[]> => {
    authenticate(context, args);

    const loans: BaseLoan[] = await Loan.find();

    return loans;
  },

  loansByMonth: async (
    _: any,
    args: any,
    context: Context
  ): Promise<BaseLoan[]> => {
    authenticate(context, args);

    const date: string = args.date;

    const loans: BaseLoan[] = await Loan.find();
    const filteredLoans: BaseLoan[] = loans.filter((loan: BaseLoan) => {
      const userDate = formatDate("month", date);

      //@ts-ignore
      return formatDate("month", loan.date) === userDate;
    });

    return filteredLoans;
  },

  loansByDay: async (_: any, args: any, context: Context) => {
    authenticate(context, args);

    const date = args.date;
    // @ts-ignore
    const loansByDay: BaseLoan = await Loan.find().byDay(date);

    return loansByDay;
  },

  loan: async (_: any, args: any, context: Context): Promise<any | null> => {
    authenticate(context, args);

    const { id } = args;
    const loan: any | null = await Loan.findById(id);

    return loan;
  },

  teamLoans: async (
    _: any,
    args: any,
    context: Context
  ): Promise<any[] | null> => {
    const { ids } = args;

    const loans = await Loan.find({ personId: { $in: ids } });

    return loans;
  },
};

export default Query;
