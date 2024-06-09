const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./resolvers/bookResolver");
const config = require("./config");
const { sequelize } = require("./models");

const server = new ApolloServer({ typeDefs, resolvers });

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to database established successfully.");
    return server.listen({ port: config.port });
  })
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
