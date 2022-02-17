import Transaction from "../../models/TransactionModel.js"
import User from "../../models/UserModel.js";

const Users = {
    transactions: async (parent) => {
        const transactions = await Transaction.find({ personId: parent.accountID })

        return transactions
    },

    team: async (parent) => {
        if (!parent.teamID && parent.teamID === null) {
            return null
        }

        if (parent.teamID) {
            const team = await User.find().where({ teamID: parent.teamID })

            return team
        }
    }
}

export default Users;