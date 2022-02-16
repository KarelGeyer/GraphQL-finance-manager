import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apolloServer from 'apollo-server-express'
import express from 'express';

import typeDefs from './schema/typeDefs.js';
import resolvers from './schema/resolvers/index.js';

const app = express()
dotenv.config();

//* instantiate new Apolloserver
const { ApolloServer } = apolloServer
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		const auth = req.headers.authorization

		return { auth };
	}

});


const PORT = process.env.PORT || 2000;
const CONNECTION_URL = process.env.CONNECTION_URL

const startApplication = async () => {
	await server.start()
	await mongoose.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then(console.log(`connected to the database`))
		.catch((err) => console.error(err));

	server.applyMiddleware({ app })

	app.listen(PORT, () => console.log(`Server is running and listening to ${PORT}`));
}

startApplication();
