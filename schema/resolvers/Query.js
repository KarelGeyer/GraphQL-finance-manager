import User from "../../models/UserModel.js"
import Transaction from "../../models/TransactionModel.js"

import { authenticate, formatDate } from '../helpers/index.js';

const Query = {
    //* User Queries
    users: async () => {
        const users = await User.find();

        return users;
    },

    user: async (_, args) => {
        const { email } = args;
        const user = await User.findOne({ email: email });

        return user;
    },



    //* Transaction Queries
    transactionsAll: async (_, args, context) => {
        authenticate(context, args)

        const transactions = await Transaction.find()

        return transactions;
    },

    transactionsByMonth: async (_, args, context) => {
        authenticate(context, args)

        const date = args.date;

        const transactions = await Transaction.find();
        const filteredTransactions = transactions.filter(transaction => {
            const userDate = formatDate("month", date);

            return formatDate("month", transaction.date) === userDate;
        })

        return filteredTransactions
    },

    transactionsByDay: async (_, args, context) => {
        authenticate(context, args)

        const date = args.date;
        const transactions = await Transaction.find().byDay(date)

        return transactions
    },

    transaction: async (_, args, context) => {
        authenticate(context, args)

        const { id } = args
        const transaction = await Transaction.findById(id)

        return transaction
    },



    //* Loans Queries
    loans: async (_, args, context) => {
        authenticate(context, args)

        const transactions = await Transaction.find()
        const loans = transactions.filter(loan => {
            return loan.isLoan === true
        })

        return loans
    },

    loansByMonth: async (_, args, context) => {
        authenticate(context, args)

        const date = args.date;

        const transactions = await Transaction.find();
        const filteredTransactions = transactions.filter(transaction => {
            const userDate = formatDate("month", date);

            return formatDate("month", transaction.date) === userDate;
        })

        const filteredLoans = filteredTransactions.filter(loan => {
            return loan.isLoan === true
        })

        return filteredLoans
    },
}

export default Query;