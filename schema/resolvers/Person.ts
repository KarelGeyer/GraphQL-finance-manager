import Loan from "../../models/LoanModel.js";
import Transaction from "../../models/TransactionModel.js";
import User from "../../models/UserModel.js";
import { BaseLoan, BaseTransaction, CompleteUser } from "../../types/index";

const Users = {
  transactions: async (parent: CompleteUser): Promise<BaseTransaction[]> => {
    const transactions: BaseTransaction[] = await Transaction.find({
      personId: parent.accountID,
    });

    return transactions;
  },

  loans: async (parent: CompleteUser): Promise<BaseLoan[]> => {
    const loans: BaseLoan[] = await Loan.find({
      personId: parent.accountID,
    });

    return loans;
  },

  team: async (parent: CompleteUser): Promise<CompleteUser[] | null> => {
    if (!parent.teamID || parent.teamID === null) {
      const team: CompleteUser = parent;
      return [team];
    }

    if (!parent.teamID !== null) {
      const team: CompleteUser[] = await User.find().where({
        teamID: parent.teamID,
      });

      return team;
    }

    return null;
  },
};

export default Users;
