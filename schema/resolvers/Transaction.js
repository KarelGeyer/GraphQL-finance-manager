import User from "../../models/UserModel.js";

const Transactions = {
    person: async (parent) => {
        const person = await User.findOne({ accountID: parent.personId });

        return person;
    },

    teamId: async (parent) => {
        const person = await User.findOne({ accountID: parent.personId });

        if (!person) {
            return null
        }

        const { teamID } = person

        if (!teamID || teamID == null) {
            return null
        }

        return teamID
    }
}

export default Transactions;