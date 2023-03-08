import { Database } from './database.js'
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: ((request,response) => {
            return response.end(JSON.stringify(database.select('users')))
        })
    },
    {
        method: 'POST',
        path: "/users",
        handler: ((request, response) => {
            const { name, email } = request.body
            database.insert('users', {
                id: randomUUID(),
                name,
                email,
            }) //const user = {}
            return response.writeHead(201).end("Criado")
        })
    }
]