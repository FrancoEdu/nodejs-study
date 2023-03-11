-> Iniciando uma API RESTful usando frameworks:

- npm init
- npm i typescript -D 
- npx tsc --init
- npm i fastify
- npm i -D @types/node
- npm i tsx -D 

-> Dentro de package.json:

"scripts": {
    "dev": "tsx watch src/server.ts"
}

-> Utilizaremos um query builder:

- npm install knex sqlite3
- Migrations é nada mais que o histórico de mudanças no nosso banco de dados