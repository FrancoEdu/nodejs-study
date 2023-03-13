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

-> REQUISITOS FUNCIONAIS

- O usuário pode criar uma nova transação
- O usuário obterá um resumo da sua conta
- O usuário deve listar todas as transações que já ocorreram
- O usuário deve poder visualizar uma transação única

-> REGRAS DE NEGÓCIO (condicionais)

- A transação pode ser do tipo crédito que somará ao valor total, ou débito subtrairá
- Deve ser possível identificarmos o usuário entre as requisições
- O usuário só pode realizar transações que ele criou

