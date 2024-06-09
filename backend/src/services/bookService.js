const { Book } = require("../models");

const getBooks = async () => {
  return await Book.findAll();
};

module.exports = {
  getBooks,
};
