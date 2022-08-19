import Transaction from "../../models/TransactionModel.js";
import User from "../../models/UserModel.js";
import { BaseTransaction, CompleteUser } from "../../types/index";

const Users = {
  transactions: async (parent: CompleteUser): Promise<BaseTransaction[]> => {
    const transactions: BaseTransaction[] = await Transaction.find({
      personId: parent.accountID,
    });

    return transactions;
  },

  team: async (parent: CompleteUser): Promise<CompleteUser[] | null> => {
    if (!parent.teamID && parent.teamID === null) {
      return null;
    }

    const team: CompleteUser[] = await User.find().where({
      teamID: parent.teamID,
    });

    return team;
  },
};

export default Users;
