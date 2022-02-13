import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apolloServer from 'apollo-server'

import typeDefs from './schema/typeDefs.js';
import resolvers from './schema/resolvers/index.js';

//* Import ApolloServer
const { ApolloServer } = apolloServer

//* instantiate new Apolloserver
const server = new ApolloServer({
	typeDefs,
	resolvers
});
dotenv.config();

const PORT = process.env.PORT || 2000;
const CONNECTION_URL = process.env.CONNECTION_URL

mongoose.connect(CONNECTION_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => server.listen(PORT, () => console.log(`Server is running and listening to ${PORT}`)))
.catch((err) => console.log(err));