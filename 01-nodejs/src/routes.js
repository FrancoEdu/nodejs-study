import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path:buildRoutePath('/users'),
        handler: ((request,response) => {
            return response.end(JSON.stringify(database.select('users')))
        })
    },
    {
        method: 'POST',
        path:buildRoutePath('/users'),
        handler: ((request, response) => {
            const { name, email } = request.body
            database.insert('users', {
                id: randomUUID(),
                name,
                email,
            }) //const user = {}
            return response.writeHead(201).end("Criado")
        })
    },
    {
        method: 'DELETE',
        path:buildRoutePath('/users/:id'),
        handler: ((request,response) => {
            const { id } = request.params

            database.delete('users', id)

            return response.writeHead(204).end()
        })
    }
]