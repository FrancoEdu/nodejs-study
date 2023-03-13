import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'

export async function transactionRoutes(app:FastifyInstance){

    app.get(('/'), async() => {
        const transactions = await knex('transactions').select()
        return {transactions}
    })

    app.get(('/:id'), async(request) => {
        const getTransactionsParamsSchema = z.object({
            id: z.string().uuid()
        })

        const params = getTransactionsParamsSchema.parse(request.params)

        const transaction = await knex('transactions').where('id', params.id).first()

        return {transaction}
    })

    app.post(('/'), async (request, reply) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })
        
        const {title, amount, type} = createTransactionBodySchema.parse(request.body) //validando os dados do request body, para ver se eles batem com o schema pre-definido

        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
        })

        return reply.status(201).send(JSON.stringify('Created!'))
    }) // 1º Parametro é o / da url, e o 2º é uma função
}