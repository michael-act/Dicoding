class BugBooks {
	constructor(id, name, pageCount, readPage, isUpdate) {
		this.id = id
		this.name = name
		this.pageCount = pageCount
		this.readPage = readPage

		this.message = undefined
		this.purpose = isUpdate ? 'memperbarui' : 'menambahkan'
	}

	check() {
		const isSuccess = [ 
			(this.name !== undefined), (this.pageCount >= this.readPage), 
			books.some((book) => book.id === this.id)
		]

		const failId = isSuccess.findIndex((val) => val === false)

		const message = [
			`Gagal ${this.purpose} buku. Mohon isi nama buku`, 
			`Gagal ${this.purpose} buku. readPage tidak boleh lebih besar dari pageCount`, 
		]
		const statusCode = [400, 400]
		const status = ['fail', 'fail']

		this.message = message[failId]
		this.statusCode = statusCode[failId]
		this.status = status[failId]
	}
}

const books = []

module.exports = { BugBooks, books }