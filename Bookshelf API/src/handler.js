const { nanoid } = require('nanoid')
const { BugBooks, books } = require('./bookshelf.js')

function addBook(request, reply) {
	const id = nanoid(16)
	const { 
		name, year, author, 
		summary, publisher, 
		pageCount, readPage, 
		reading 
	} = request.payload
	const insertedAt = new Date().toISOString()
	const updatedAt = insertedAt
	const finished = (pageCount === readPage)

	books.push({ 
		id, name, year, author, 
		summary, publisher, 
		pageCount, readPage, 
		finished, reading, 
		insertedAt, updatedAt 
	})

	const currBook = new BugBooks(id, name, pageCount, readPage, false)
	currBook.check()

	let response
	if (currBook.message === undefined) {
		response = reply.response({
			"status": "success",
			"message": "Buku berhasil ditambahkan",
			"data": {
				"bookId": id
			}
		})

		response.code(201)
	} else {
		response = reply.response({
  			"status": currBook.status ? currBook.status : 'error',
  			"message": currBook.message ? currBook.message : 'Buku gagal ditambahkan'
		})

		const index = books.findIndex((book) => book.id === id)
		books.splice(index, 1)

		response.code(currBook.statusCode ? currBook.statusCode : 500)
	}

	return response
}

function getAllBooks(request, reply) {
	let { name, reading, finished } = request.query
	name = name.toLowerCase()

	const response = reply.response({
		"status": "success", 
		"data": {
			"books": books.filter(book => 
				(name ? (book.name.toLowerCase().indexOf(name) > -1) : true) &&
				(reading ? (book.reading == reading) : true) &&
				(finished ? (book.finished == finished) : true)
			).map(book => ({ 
				"id": book.id, 
				"name": book.name, 
				"publisher": book.publisher 
			}))
		}
	})

	return response
}

function getBookById(request, reply) {
	const { bookId } = request.params
	const book = books.find((book) => book.id === bookId)

	let response
	if (book !== undefined) {
		response = reply.response({
			"status": "success", 
			"data": {
				book
			}
		})
	} else {
		response = reply.response({
			"status": "fail", 
			"message": "Buku tidak ditemukan"
		})

		response.code(404)
	}

	return response
}

function editBookById(request, reply) {
	const { bookId } = request.params
	const { 
		name, year, author, 
		summary, publisher, 
		pageCount, readPage, 
		reading
	} = request.payload
	const updatedAt = new Date().toISOString()
	const finished = (pageCount === readPage)

	const index = books.findIndex((book) => book.id === bookId)

	const currBook = new BugBooks(bookId, name, pageCount, readPage, true)
	currBook.check()

	let response
	if ((index !== -1) && (currBook.message === undefined)) {
		const book = books[index]
		book.name = name
		book.year = year
		book.author = author
		book.summary = summary
		book.publisher = publisher
		book.pageCount = pageCount
		book.readPage = readPage
		book.reading = reading
		book.updatedAt = updatedAt
		book.finished = finished

		response = reply.response({
			"status": "success", 
			"message": "Buku berhasil diperbarui"
		})
	} else {
		response = reply.response({
			"status": currBook.status ? currBook.status : 'fail', 
			"message": currBook.message ? currBook.message : 'Gagal memperbarui buku. Id tidak ditemukan'
		})

		response.code(currBook.statusCode ? currBook.statusCode : 404)
	}

	return response
}

function deleteBookById(request, reply) {
	const { bookId } = request.params
	const index = books.findIndex((book) => book.id === bookId)

	let response
	if (index !== -1) {
		books.splice(index, 1)
		response = reply.response({
			"status": "success", 
			"message": "Buku berhasil dihapus"
		})
	} else {
		response = reply.response({
			"status": "fail",
			"message": "Buku gagal dihapus. Id tidak ditemukan"
		})

		response.code(404)
	}

	return response
}

module.exports = { addBook, getAllBooks, getBookById, editBookById, deleteBookById }
