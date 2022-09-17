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
    loans: [Loan]
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
    personId: String!
    person: User
    teamId: String
  }

  type Loan {
    id: ID!
    name: String!
    sum: Int!
    currency: Currency!
    date: DateTime!
    creditorEmail: String
    creditor: User
    debtorEmail: String!
    personId: String!
    isPayed: Boolean!
    debtor: User
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
    teamTransactions(ids: [String]!): [Transaction]

    loansAll: [Loan!]!
    loansByMonth(date: String!): [Loan]
    loansByDay(date: String!): [Loan]
    loan: Loan!
    teamLoans(ids: [String]!): [Loan]
  }

  "*** Mutation ***"
  type Mutation {
    createUser(user: UserInput): User
    deleteUser(user: UserInput): User
    updateUser(user: UserInput): User

    createTransaction(transaction: TransactionInput): Transaction
    updateTransaction(transaction: TransactionInput): Transaction
    deleteTransaction(transaction: TransactionInput): Transaction

    createLoan(loan: LoanInput): Loan
    updateLoan(loan: LoanInput): Loan
    deleteLoan(id: String): Loan

    refreshToken(email: String!): RefreshToken
    login(user: LoginCredentials!): RefreshToken
    createTeamId(userEmails: [String], teamId: String): String
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

  input LoanInput {
    id: ID
    name: String!
    sum: Int!
    currency: Currency!
    date: DateTime
    creditorEmail: String
    debtorEmail: String!
    personId: String!
    isPayed: Boolean!
  }

  input TransactionInput {
    id: ID
    name: String!
    category: Category!
    sum: Int!
    currency: Currency
    creditorEmail: String
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
