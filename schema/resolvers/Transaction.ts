import User from "../../models/UserModel.js";
import { BaseTransaction, BaseUser, CompleteUser } from "../../types/index";

const Transactions = {
  person: async (parent: BaseTransaction): Promise<BaseUser | null> => {
    const person: BaseUser | null = await User.findOne({
      accountID: parent.personId,
    });

    return person;
  },

  teamId: async (parent: BaseTransaction): Promise<string | null> => {
    const person: CompleteUser | null = await User.findOne({
      accountID: parent.personId,
    });

    if (!person) {
      return null;
    }

    const { teamID } = person;

    if (!teamID || teamID == null) {
      return null;
    }

    return teamID;
  },
};

export default Transactions;
