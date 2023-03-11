import fastify from "fastify";
import { knex } from "./database";

const app = fastify()

app.get(('/hello'), async () => {
    const tables = await knex('sqlite_schema').select('*') // buscando dados de uma tabela 
    return tables
}) // 1º Parametro é o / da url, e o 2º é uma função

app.listen({
    port: 3333,
}).then(() => {
    console.log("HTTP Server Running") //. then pq retorna uma promisse
})