import mongoose from "mongoose";

const LoanModel = new mongoose.Schema({
  name: {
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
  creditorEmail: {
    type: String,
  },
  debtorEmail: {
    type: String,
  },
  personId: {
    type: String,
  },
  isPayed: {
    type: Boolean,
  },
});

LoanModel.query.byDay = async function (date: any) {
  return this.where({ date: date });
};

export default mongoose.model("Loan", LoanModel);
