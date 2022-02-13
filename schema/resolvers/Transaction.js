import axios from "axios";

import User from "../../models/UserModel.js";

const Transactions = {
    person: async (parent) => {
        const person = await User.findOne({accountID: parent.personId});

        return person;
    },
}

export default Transactions;