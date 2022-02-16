import apolloServer from 'apollo-server-express'
import jwt from 'jsonwebtoken';

const { AuthenticationError } = apolloServer


const authenticate = (context, args) => {
  const token = context.auth;

  if (!token) {
    throw ('Something went wrong #token #login #nosignin')
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      throw new AuthenticationError("User must be signed in, invalid token")
    }

    args.auth = user.iat;

    return user
  })

}

export default authenticate