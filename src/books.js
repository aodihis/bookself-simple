const { nanoid } = require('nanoid');
const NotFoundError = require('./errors/NotFoundError');
const ValidationError = require('./errors/ValidationError');
const RangePageError = require('./errors/RangePageError');

const books = [];

const saveBook = (book) => {
  const { id, name, pageCount, readPage } = book;

  if (name === null) {
    throw new ValidationError('name is reqired.', 'name');
  }

  if (pageCount !== null && readPage !== null && readPage > pageCount) {
    throw new RangePageError('readPage higher thatn pageCount');
  }
  book['finished'] = pageCount === readPage;
  book['updatedAt'] = new Date().toISOString();
  if (id === null || id === undefined) {
    book['id'] = nanoid(16);
    book['insertedAt'] = book['updatedAt'] ;
    books.push(book);
  } else {
    const index = books.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundError('Book not found');
    }
    for (const key in book) {
      if (book[key] !== null || book[key] !== undefined) {
        books[index][key] = book[key];
      }
    }
  }
};

const getBookById = (id) => {
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    return null;
  }
  return books[index];

};

const deleteBookById = (id) => {
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    throw new NotFoundError('Buku gagal dihapus. Id tidak ditemukan');
  }
  books.splice(index, 1);
};
module.exports = { books, saveBook, getBookById, deleteBookById };