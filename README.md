# 💻GraphQL Server for Finance Manager

This is a backend written in Nodejs and GraphQL for [Finance Manager project ](https://github.com/KarelGeyer/home-finance-manager)

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
CONNECTION_URL - connection url to your mongo database
PORT - optional, will default to 2000 if not added
ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET
```
