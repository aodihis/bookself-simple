const { addBookHandler, getBooksHandler, getBookByIdHandler, deleteBookByIdHandler, updateBookByIdHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path:'/books',
    handler: addBookHandler
  },
  {
    method: 'GET',
    path:'/books',
    handler: getBooksHandler
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBookByIdHandler
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler
  }
];

module.exports = routes;