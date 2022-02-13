import User from "../../models/UserModel.js"
import Transaction from "../../models/TransactionModel.js"

const Mutation = {
    createUser: async (_, args) => {
        const user  = args.content;

        try {
            const newUser = await new User(user);
            const savedUser = await newUser.save();

            if (!savedUser){
                throw("user could not be created");
            }

            return savedUser;
        } catch (err) {
            return err.message;
        }
    },
    deleteUser: async (_, args) => {
        const {user} = args;
        const {email, password} = user;

        //* delete all of the transactions for this user

        try {
            const thisUser = await User.findOneAndDelete({
                email: email
            });
            
            if(!thisUser) {
                throw("user could not be deleted")
            }
        } catch(err) {
            return err.message;
        }
    },
    updateUser: async (_, args) => {
        const {user} = args;
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

            if(!thisUser) {
                throw("Something went wrong");
            }

            return thisUser;
        } catch(err) {
            return err.message;
        }
    },


    createTransaction: async (_, args) => {
        const {transaction} = args;
        const {personId, name, sum, isLoan, currency} = transaction;

        if(!personId || !name || !sum) {
            throw("Transaction could not be saved, error #1");
        }

        if(!isLoan) {
            transaction.isLoan = false;
        }

        if(!currency){
            transaction.currency = "EUR";
        }

        const newDate = new Date();
        const day = newDate.getDate();
        const year = newDate.getFullYear();
        const getMonth = newDate.getMonth() + 1;
        const month = getMonth > 9 ? getMonth : `0${getMonth}`;
        const date = `${year}-${month}-${day}`

        transaction.date = date;

        try {
            const newTransaction = await new Transaction(transaction);
            const saveTransaction = await newTransaction.save();

            if (!saveTransaction) {
                throw("Transaction could not be saved, error #2");
            }
            
            return saveTransaction;
        } catch(err) {
            return err.message;
        }
    },
    deleteTransaction: async (_, args) => {
        const {transaction} = args;
        const {id} = transaction;

        try {
            const deletedTransaction = await Transaction.findByIdAndDelete({_id: id});

            if(!deletedTransaction) {
                throw("Transaction could not be deleted");
            }

            return deletedTransaction;
        } catch(err) {
            return err.message;
        }
    },
    updateTransaction: async (_, args) => {
        const {transaction} = args;
        const {
            category,
            sum,
            date,
            isLoan,
            name,
            id
        } = transaction;

        try {
            const updatedTransaction  = await Transaction.findByIdAndUpdate({
                _id: id
            }, {
                category: category && category,
                sum: sum && sum,
                date: date && date,
                isLoan: isLoan && isLoan,
                name: name && name,
            })

            if (!updatedTransaction) {
                throw("Transaction could not be updated");
            };

            return updatedTransaction;
        } catch(err) {
            return err.message;
        }
    },

}

export default Mutation