const uuid = require("uuid");

// Ephemeral in-memory data store
const books = [
  {
    id: "42",
    name: "The Answer To Everything"
  }
];

const createBook = name => {
  const book = {
    id: uuid.v4(),
    name
  };
  books.push(book);
  return book;
};
const byId = id => b => b.id === id;
const getBook = id => books.find(byId(id));
const getAllBooks = () => books;
const updateBook = (book, id) => {
  const foundIdx = books.findIndex(byId(id));
  books[foundIdx] = book;
  return book;
};

module.exports = {
  createBook,
  getBook,
  getAllBooks,
  updateBook
};
