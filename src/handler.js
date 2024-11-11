const { saveBook, books, getBookById, deleteBookById } = require('./books');
const NotFoundError = require('./errors/NotFoundError');
const RangePageError = require('./errors/RangePageError');
const ValidationError = require('./errors/ValidationError');

const addBookHandler = (request, h) => {
  const { name = null,
    year = null,
    author = null,
    summary = null,
    publisher = null,
    pageCount = null,
    readPage = null,
    reading = null } = request.payload;
  const book = { name, year, author, summary, publisher, pageCount, readPage, reading };

  try {
    saveBook(book);
  } catch (error) {
    const res = h.response({
      status: 'fail',
      message: (error instanceof ValidationError && error.field === 'name')
        ? 'Gagal menambahkan buku. Mohon isi nama buku'
        : (error instanceof RangePageError)
          ? 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
          : ''
    });
    res.code(400);
    return res;
  }
  const res = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: book['id']
    }
  });
  res.code(201);
  return res;

};

const getBooksHandler = (request) => {

  const { name = null, reading = null, finished = null } = request.query;

  const retBooks = books.filter((book) => {
    if (name !== null) {
      return book.name.toLowerCase().includes(name.toLowerCase());
    }
    if (reading !== null) {
      return book.reading == reading;
    }
    if (finished !== null) {
      return book.finished == finished;
    }
    return true;
  });

  return {
    status: 'success',
    data: {
      books: retBooks.map(({ id, name, publisher }) => ({ id, name, publisher }))
    }
  };
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = getBookById(id);

  if (book === null) {
    const res = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    });
    res.code(404);
    return res;
  }

  const res = h.response({
    status: 'success',
    data: {
      book
    }
  });
  res.code(200);
  return res;

};

const updateBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const { name = null,
    year = null,
    author = null,
    summary = null,
    publisher = null,
    pageCount = null,
    readPage = null,
    reading = null } = request.payload;
  const book = { id, name, year, author, summary, publisher, pageCount, readPage, reading };

  try {
    saveBook(book);
  } catch (error) {

    let msg = 'Internal server error';
    let statusCode = 500;
    if (error instanceof ValidationError && error.field === 'name') {
      msg ='Gagal memperbarui buku. Mohon isi nama buku';
      statusCode = 400;
    } else if (error instanceof RangePageError) {
      msg ='Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount';
      statusCode = 400;
    } else if (error instanceof NotFoundError) {
      msg = 'Gagal memperbarui buku. Id tidak ditemukan';
      statusCode = 404;
    }

    const res = h.response({
      status: 'fail',
      message: msg
    }).code(statusCode);

    return res;
  }
  const res = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  return res;

};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  try {
    deleteBookById(id);
  } catch (error) {
    const res = h.response({
      status: 'fail',
      message: error.message
    });
    res.code(404);
    return res;
  }
  return {
    status: 'success',
    message: 'Buku berhasil dihapus'
  };
};

module.exports = { addBookHandler, getBooksHandler, getBookByIdHandler, updateBookByIdHandler, deleteBookByIdHandler };