const Hapi = require('@hapi/hapi')
const routes = require('./routes.js')

const init = async function () {
	const port = 5000
	const host = process.env.NODE_ENV ? '0.0.0.0' : '127.0.0.1'

	const server = Hapi.server({
		port: port, 
		host: host, 
		routes: {
			cors: {
				origin: ['http://notesapp-v1.dicodingacademy.com']
			}
		}
	})

	server.route(routes)

	await server.start()
	console.log(`Server sudah berjalan di ${host}:${port}`)
}

init()
