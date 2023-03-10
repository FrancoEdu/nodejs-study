import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'
import { request } from "node:http"

const database = new Database() //instanciando o banco

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: ((request,response) => {
            const { search } = request.query

            const users = database.select('tasks', search ? {
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
            const { title, description, completed_at, created_at, update_at } = request.body

            if(!title || !description){
                return response.writeHead(404).end("Not found title or description")
            }

            database.insert('tasks', {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date(),
                update_at: new Date(),
            })
            return response.writeHead(201).end('Created !')
        })
    },
    {
        method: 'DELETE',
        path: buildRoutePath("/tasks/:id"),
        handler: ((request,response) => {
            const { id } = request.params

            database.delete('tasks', id)

            return response.writeHead(204).end("Deleted !")
        })
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: ((request, response) => {
            const { id } = request.params
            const { title, description} = request.body


            if(!title || !description){
                return response.writeHead(404).end("Not found title or description")
            }

            database.update('tasks', id, {
                title,
                description,
                update_at: new Date()
            })

            return response.writeHead(201).end("Updated !")
        })
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: ((request,response) => {
            const { id } = request.params

            database.update('tasks', id, { 
                completed_at: new Date() 
            })

            return response.writeHead(204).end()
        })
    }
]