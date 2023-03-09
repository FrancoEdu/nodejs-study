import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database() //instanciando o banco

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: ((request,response) => {
            const { search } = request.query

            const users = database.select('users', search ? {
                title: search,
                description: search,
                completed_at: search,
                created_at: search,
                update_at: search
            }:null)

            return response.end(JSON.stringify(users))
        })
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: ((request, response) => {
            const tasks = { 
                id = randomUUID(),
                title,
                description,
                completed_at = null,
                created_at = new Date(),
                update_at = new Date(),
            } = request.body

            database.insert('/tasks', tasks)
            return response.writeHead(201).end('Criado!')
        })
    }
]