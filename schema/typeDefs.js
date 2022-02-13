import { gql } from "apollo-server";

const typeDefs = gql`
    "*** Union - does not have any resolvers yet ***"
    union AllData = User | Transaction

    "*** Scalar ***"
    scalar DateTime

    "*** Models ***"
    type User {
        id: ID!
        name: String!
        surname: String!
        password: String!
        email: String!
        phoneNumber: String
        currency: Currency
        accountID: String!
        teamID: String
        transactions: [Transaction]
    }

    type Transaction {
        id: ID!
        name: String!
        category: Category
        sum: Int!
        currency: Currency!
        date: DateTime!
        isLoan: Boolean!
        personId: String!
        person: User
    }

    type Currencies {
        value: Int
    }

    type SumByCurrency {
        czk: String
        eur: String
    }

    "*** Query ***"
    type Query {
        users: [User!]!
        user: User!

        transactions: [Transaction!]!
        transactionsByMonth: [Transaction]
        transaction: Transaction!

        curencies: [Currencies]
    } 

    "*** Mutation ***"
    type Mutation {
        createUser(user: UserInput): User
        deleteUser(user: UserInput): User
        updateUser(user: UserInput): User

        createTransaction(transaction: TransactionInput): Transaction
        updateTransaction(transaction: TransactionInput): Transaction
        deleteTransaction(transaction: TransactionInput): Transaction
    }

    "*** Inputs ***"
    input UserInput {
        name: String!
        surname: String!
        password: String!
        email: String!
        phoneNumber: Int
        currency: Currency
        accountID: String!
        teamID: String
        newEmail: String
    }

    input TransactionInput {
        id: ID
        name: String!
        category: String!
        sum: Int!
        currency: Currency
        isLoan: Boolean
        personId: String!,
        date: DateTime
    }

    "*** Enums ***"
    enum Currency {
        CZK
        EUR
    }

    enum Category {
        HOME
        FREE_TIME
        SHOPPING
        VACATION
        INVEST
        TELCO
        CLOTHS
        OTHER
        GEAR
        ENERGY
        TRANSPORT
        DAMAGE
    }
`

export default typeDefs;