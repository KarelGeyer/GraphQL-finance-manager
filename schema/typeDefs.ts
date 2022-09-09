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
    currency: Currency!
    accountID: String
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
    teamId: String
  }

  type SumByCurrency {
    czk: String
    eur: String
  }

  type RefreshToken {
    refreshToken: String
  }

  "*** Query ***"
  type Query {
    users: [User!]!
    user(email: String): User!

    transactionsAll: [Transaction!]!
    transactionsByMonth(date: String!): [Transaction]
    transactionsByDay(date: String!): [Transaction]
    transaction: Transaction!

    loans(auth: String): [Transaction]
    loansByMonth(auth: String, date: String!): [Transaction]
  }

  "*** Mutation ***"
  type Mutation {
    createUser(user: UserInput): User
    deleteUser(auth: String, user: UserInput): User
    updateUser(auth: String, user: UserInput): User

    createTransaction(transaction: TransactionInput): Transaction
    updateTransaction(transaction: TransactionInput): Transaction
    deleteTransaction(transaction: TransactionInput): Transaction

    refreshToken(email: String!): RefreshToken
    login(user: LoginCredentials!): RefreshToken
    createTeamId(users: TeamId!): String
  }

  "*** Inputs ***"
  input UserInput {
    name: String!
    surname: String!
    password: String!
    email: String!
    phoneNumber: Int
    currency: Currency
    accountID: String
    teamID: String
    newEmail: String
    newPassword: String
    refreshToken: String
  }

  input TransactionInput {
    id: ID
    name: String!
    category: Category!
    sum: Int!
    currency: Currency
    isLoan: Boolean
    personId: String
    date: DateTime
  }

  input UserTransaction {
    accountID: String
    teamID: String
  }

  input LoginCredentials {
    email: String!
    password: String!
  }

  input TeamId {
    accountIDFirstUser: String
    accountIDSecondUser: String
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
`;

export default typeDefs;
