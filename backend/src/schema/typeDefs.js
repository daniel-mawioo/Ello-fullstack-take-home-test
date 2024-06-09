const { gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    coverPhotoURL: String!
    readingLevel: String!
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    createBook(
      title: String!
      author: String!
      coverPhotoURL: String!
      readingLevel: String!
    ): Book
  }
`;

module.exports = typeDefs;
