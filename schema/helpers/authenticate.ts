import apolloServer from "apollo-server-express";
import jwt from "jsonwebtoken";
import { Context } from "../../types/index";

const { AuthenticationError } = apolloServer;

const authenticate = (context: Context, args: any) => {
  const token: string = context.auth;

  if (!token) {
    throw "Something went wrong #token #login #nosignin";
  }

  // @ts-ignore
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      throw new AuthenticationError("User must be signed in, invalid token");
    }

    // @ts-ignore
    args.auth = user.iat;

    return user;
  });
};

export default authenticate;
