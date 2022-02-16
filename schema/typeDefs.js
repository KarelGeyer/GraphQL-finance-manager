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
        refreshToken: String
        team: [User]
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


    type SumByCurrency {
        czk: String
        eur: String
    }

    "*** Query ***"
    type Query {
        users: [User!]!
        user: User!

        transactions(auth: String): [Transaction!]!
        transactionsByMonth(auth: String, date: String!): [Transaction]
        transactionsByDay(auth: String, date: String!): [Transaction]
        transaction(auth: String): Transaction!
        
        loans(auth: String): [Transaction]
        loansByMonth(auth: String, date: String!): [Transaction]
    } 

    "*** Mutation ***"
    type Mutation {
        createUser(user: UserInput): User
        deleteUser(user: UserInput): User
        updateUser(user: UserInput): User

        createTransaction(auth: String, transaction: TransactionInput): Transaction
        updateTransaction(auth: String, transaction: TransactionInput): Transaction
        deleteTransaction(auth: String, transaction: TransactionInput): Transaction
        
        refreshToken(user: UserInput!): String
        login(user: UserInput!): String
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
        refreshToken: String
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