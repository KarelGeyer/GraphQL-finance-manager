import axios from "axios";

import User from "../../models/UserModel.js"
import Transaction from "../../models/TransactionModel.js"

const Query = {
    //* User queries
    users: async () => {
        const users = await User.find();

        return users;
    },
    user: async (_, args) => {
        const {email} = args;
        const user = await User.findOne({email: email});

        return user;
    },

    //* Transaction Queries
    transactions: async () => {
        const transactions = await Transaction.find()

        return transactions;
    },
    transaction: async (_, args) => {
        const {id} = args
        const transaction = await Transaction.findById(id)

        return transaction
    },

    curencies: async () => {
        let czkRate;
        let eurRate

        await axios.get(`https://free.currconv.com/api/v7/convert?q=EUR_CZK&compact=ultra&apiKey=836d0b8433d05fb1ce7a`)
        .then(res => {
            czkRate = {"value": Object.values(res.data)};
        });

        await axios.get(`https://free.currconv.com/api/v7/convert?q=CZK_EUR&compact=ultra&apiKey=836d0b8433d05fb1ce7a`)
        .then(res => {
            eurRate = {"value": Object.values(res.data)};
        });

        //*** Testing the convetions ***//
        //* convert from czk to eur
        //* const test = 100 * eurRate[0]
        //* console.log(test);

        //* convert from eur to czk
        //* const test = 4.07 * czkRate[0]
        //* console.log(test);

        const array = [czkRate[0], eurRate[0]]

        console.log(array)

        return array
    }
}

export default Query;