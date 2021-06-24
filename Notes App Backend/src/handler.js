const { nanoid } = require('nanoid')
const notes = require('./notes.js')

function addNote(request, h) {
	const id = nanoid(16)
	const { title, tags, body } = request.payload
	const createdAt = new Date().toISOString()
	const updatedAt = createdAt

	notes.push({ id, title, tags, body, createdAt, updatedAt })

	const isSuccess = notes.some((note) => note.id === id)

	let response
	if (isSuccess) {
		response = h.response({
			"status": "success",
			"message": "Catatan berhasil ditambahkan",
			"data": {
				"noteId": id
			}
		})

		response.code(201)
	} else {
		response = h.response({
  			"status": "error",
  			"message": "Catatan gagal untuk ditambahkan"
		})

		response.code(500)
	}

	return response
}

function getAllNotes(request, h) {
	const response = h.response({
		"status": "success", 
		"data": {
			notes
		}
	})

	return response
}

function getNoteById(request, h) {
	const { id } = request.params
	const note = notes.find((note) => note.id === id)

	let response
	if (note !== undefined) {
		response = h.response({
			"status": "success", 
			"data": {
				note
			}
		})
	} else {
		response = h.response({
			"status": "fail", 
			"message": "Catatan tidak ditemukan"
		})

		response.code(404)
	}

	return response
}

function editNoteById(request, h) {
	const { id } = request.params
	const { title, tags, body } = request.payload
	const updatedAt = new Date().toISOString()

	const index = notes.findIndex((note) => note.id === id)

	let response
	if (index !== -1) {
		const note = notes[index]
		note.title = title
		note.tags = tags
		note.body = body
		note.updatedAt = updatedAt

		console.log('Sukses')

		response = h.response({
			"status": "success", 
			"message": "Catatan berhasil diperbaharui"
		})
	} else {
		response = h.response({
			"status": "fail", 
			"message": "Gagal memperbarui catatan. Id catatan tidak ditemukan"
		})

		response.code(404)
	}

	return response
}

function deleteNoteById(request, h) {
	const { id } = request.params
	const index = notes.findIndex((note) => note.id === id)

	let response
	if (index !== -1) {
		notes.splice(index, 1)
		response = h.response({
			"status": "success", 
			"message": "Catatan berhasil dihapus"
		})
	} else {
		response = h.response({
			"status": "fail",
			"message": "Catatan gagal dihapus. Id catatan tidak ditemukan"
		})

		response.code(404)
	}

	return response
}

module.exports = { addNote, getAllNotes, getNoteById, editNoteById, deleteNoteById }