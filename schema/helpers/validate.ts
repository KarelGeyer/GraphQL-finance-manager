import { AuthenticationError } from "apollo-server";
import bcrypt from "bcrypt";
import User from "../../models/UserModel.js";
import { BaseUser } from "../../types/index";

const validate = async (user: BaseUser): Promise<boolean> => {
  const foundUser: BaseUser[] = await User.find({ email: user.email });
  if (!foundUser || foundUser.length === 0) {
    throw new AuthenticationError(
      "Email or Password is wrong! #auth #validate #1"
    );
  }

  const isPasswordCorrect = await bcrypt.compare(
    user.password,
    foundUser[0].password
  );

  if (!isPasswordCorrect) {
    throw new AuthenticationError(
      "Email or Password is wrong! #auth #validate #2"
    );
  }

  return isPasswordCorrect;
};

export default validate;
