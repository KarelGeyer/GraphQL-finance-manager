import mongoose from 'mongoose';

const TransactionModel = new mongoose.Schema({
    name: {
      type: String,
    },
    category: {
      type: String,
    },
    sum: {
      type: Number,
    },
    currency: {
      type: String,
    },
    date: {
      type: String,
    },
    isLoan: {
      type: Boolean
    },
    accountId: {
      type: String
    },
    personId: {
      type: String
    }
  });

  export default mongoose.model('Transaction', TransactionModel);