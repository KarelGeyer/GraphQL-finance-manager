//* resolvers */
import Mutation from "./Mutation.js";
import Users from "./Person.js";
import Query from "./Query.js";
import Transactions from "./Transaction.js";
//* scalars */
import DateTime from "../scalars/DateTime.js";

const resolvers = {
	//* scalars */
	DateTime: DateTime,

	//* resolvers */
	Query: Query,
	Mutation: Mutation,
	Transaction: Transactions,
	User: Users
}

export default resolvers;