const uuid = require('uuid');

// Ephemeral in-memory data store
const books = [{
    id: 42,
    name: 'The Answer To Everything'
}]

const createBook = (name) => {
    const book = {
        id: uuid.v4(),
        name
    };
    books.push(book);
    return book;
}
const getBook = (id) => books.find(u => u.id === parseInt(id))
const getAllBooks = () => books;
const updateBook = (book, id) => {
    books.filter(b => b.id === id)
        .forEach(b => b.name = book.name);
}

module.exports = {
    createBook,
    getBook,
    getAllBooks,
    updateBook
}