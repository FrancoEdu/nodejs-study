import { randomUUID } from "crypto";
import fastify from "fastify";
import { knex } from "./database";
import {  env } from "./env";

const app = fastify()

app.get(('/hello'), async () => {
    // const transactions = await knex('transactions').insert({
    //     id: randomUUID(),
    //     title: 'Transaction number 1',
    //     amount: 2000,
    // }).returning('*')
    // return transactions

    


}) // 1º Parametro é o / da url, e o 2º é uma função

app.listen({
    port: env.PORT,
}).then(() => {
    console.log("HTTP Server Running") //. then pq retorna uma promisse
})