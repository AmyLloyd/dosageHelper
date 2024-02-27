const express = require("express");
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');


const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

console.log(db, "db");

const PORT = process.env.PORT || 8080;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers
  });

console.log(server, "server");
  
const startApolloServer = async () => {
await server.start();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/graphql', expressMiddleware(server, {
  context: authMiddleware
  
}));


  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
console.log(app, "app");

  db.once("open", () => {
      app.listen(PORT, () => {
          console.log(`API server running on port ${PORT}!`);
          console.log(`Use GraphQL at http://localhost:${PORT}/graphQL`);
      });
  });
};

startApolloServer();
