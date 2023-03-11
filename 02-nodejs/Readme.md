-> Iniciando uma API RESTful usando frameworks:

- npm init
- npm i typescript -D 
- npx tsc --init
- npm i fastify
- npm i -D @types/node
- npm i tsx -D 

-> Dentro de package.json:

"scripts": {
    "dev": "tsx watch src/server.ts",
    "knex": "node --loader tsx ./node_modules/knex/bin/cli.js",
}

-> Utilizaremos um query builder:

- npm install knex sqlite3
- Migrations é nada mais que o histórico de mudanças no nosso banco de dados
- npm run knex -- migrate:make *nomeDaTabela*
- npm run knex -- migrate:latest -> executa a tabela

-> Validação de dados:

- npm i zod