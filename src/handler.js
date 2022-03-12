const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const requestBody = request.payload;

  if (!Object.prototype.hasOwnProperty.call(requestBody, 'name')) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400);
  }

  if (requestBody.readPage > requestBody.pageCount) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  const id = nanoid(16);
  const finished = requestBody.pageCount === requestBody.readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name: requestBody.name,
    year: requestBody.year,
    author: requestBody.author,
    summary: requestBody.summary,
    publisher: requestBody.publisher,
    pageCount: requestBody.pageCount,
    readPage: requestBody.readPage,
    finished,
    reading: requestBody.reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.some((book) => book.id === id);

  if (!isSuccess) {
    return h
      .response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
      })
      .code(500);
  }

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    })
    .code(201);
};

const getAllBooksHandler = (request) => {
  const {
    name = null,
    reading = null,
    finished = null,
  } = request.query;

  let filteredBooks = [...books];

  // Filter all books according to the value given in the query parameters.
  // Don't use "else" because the request can take more than one query parameter.
  if (name) {
    filteredBooks = filteredBooks
      .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading === '0' || reading === '1') {
    filteredBooks = filteredBooks
      .filter((book) => book.reading === !!parseInt(reading, 10));
  }

  if (finished === '0' || finished === '1') {
    filteredBooks = filteredBooks
      .filter((book) => book.finished === !!parseInt(finished, 10));
  }

  // Show only the id, name, and publisher.
  filteredBooks = filteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return {
    status: 'success',
    data: {
      books: filteredBooks,
    },
  };
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const searchedBook = books.find((book) => book.id === id);

  if (searchedBook === undefined) {
    return h
      .response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      })
      .code(404);
  }

  return {
    status: 'success',
    data: {
      book: searchedBook,
    },
  };
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const requestBody = request.payload;

  if (!Object.prototype.hasOwnProperty.call(requestBody, 'name')) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
      .code(400);
  }

  if (requestBody.readPage > requestBody.pageCount) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      })
      .code(404);
  }

  const finished = requestBody.pageCount === requestBody.readPage;
  const updatedAt = new Date().toISOString();

  books[index] = {
    ...books[index],
    name: requestBody.name,
    year: requestBody.year,
    author: requestBody.author,
    summary: requestBody.summary,
    publisher: requestBody.publisher,
    pageCount: requestBody.pageCount,
    readPage: requestBody.readPage,
    finished,
    reading: requestBody.reading,
    updatedAt,
  };

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    })
    .code(200);
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    return h
      .response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      })
      .code(404);
  }

  books.splice(index, 1);

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    })
    .code(200);
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
