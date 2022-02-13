import Transaction from "../../models/TransactionModel.js"

const Users = {
    transactions: async (parent) => {
        const transactions = await Transaction.find({personId: parent.accountID})

        return transactions
    }
}

export default Users;