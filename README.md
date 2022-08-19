# 💻Xzone Data Analytics Report

Welcome to Xzone Data Analytics report

### Requirements

- Node.js
- npm

### Technologies

- [GraphQL](https://graphql.org/)
- [Nodemon](https://nodemon.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Express](https://expressjs.com/)
- [JWT](https://jwt.io/)
- [Apollo Server](https://www.apollographql.com/)
- [MongoDB](https://docs.mongodb.com/manual/)
- [Mongoose](https://mongoosejs.com/)

### Start the project

Clone the repository

```sh
git clone https://github.com/KarelGeyer/GraphQL-finance-manager.git
npm install
npm start
```

### Database

You are going to need to use your own mongoDB database

```sh
create your .env file and add:
CONNECTION_URL = (place url for your mongoDB database)
PORT = You should run the backend on http://localhost:3027, otherwise you are going to have update preset URLs in `src/assets/static_data/StaticData.js`
TOKEN_SECRET = (add your token here for security)
```
