const { getBooks } = require("../services/bookService");
const { Book } = require("../models");

const resolvers = {
  Query: {
    books: () => getBooks(),
  },
  Mutation: {
    createBook: async (_, { title, author, coverPhotoURL, readingLevel }) => {
      const book = await Book.create({
        title,
        author,
        coverPhotoURL,
        readingLevel,
      });
      return book;
    },
  },
};

module.exports = resolvers;
