const { createBook, getAllBooks, getBook, updateBook } = require('../data/bookRepository');

// get /book/{id}
const get = (req, res) => {
    console.log(req.params.id);
    const book = getBook(req.params.id);

    if (!book) return res.status(404).json({})

    return res.json(book);
}
// get /book
const getAll = (req, res) => {
    res.json(getAllBooks());
}
// post /book
const post = (req, res) => {
    const book = createBook();
    res.status(201).json(book);
}
// put /book/{id}
const put = (req, res) => {
    const { id } = req.params;
    const book = getBook(id);

    if (!book) return res.status(404).json({})

    updateBook(book, id);
    res.json(book);
}

module.exports = {
    get,
    getAll,
    post,
    put,
}