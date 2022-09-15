import User from "../../models/UserModel.js";
import { BaseLoan, BaseUser, CompleteUser } from "../../types/index";

const Loans = {
  debtor: async (parent: BaseLoan): Promise<BaseUser | null> => {
    const debtor: BaseUser | null = await User.findOne({
      email: parent.debtorEmail,
    });

    return debtor;
  },

  creditor: async (parent: BaseLoan): Promise<CompleteUser | null> => {
    const creditor: CompleteUser | null = await User.findOne({
      email: parent.creditorEmail,
    });

    if (!creditor) {
      return null;
    }

    return creditor;
  },
};

export default Loans;
