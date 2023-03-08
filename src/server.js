import http from 'node:http' //modulo intrno não é necessário instalação, por padrão colocasse node:
import  { json }  from './middlewares/json.js'

// Rotas são formas de entradas para executar várias tarefas, como por exemplo:
// -> Craiação de Usuários
// -> Listagem de usuários
// -> Exclusão
// -> Edição
// -> GET, POST, PUT PATCH, DELETE

// => GET = BUSCA INFORMAÇÃO PARA O BACKEND
// => POST = CRIAR UM RECURSO NO BACKEND
// => PUY = ATUALIZAR UM RECURSO NO BACKEND ( ATUALIZA MUITOS CAMPOS AO MESMO TEMPO)
// => PATCH = ATUALIZAR UMA INFORMAÇÃO ESPECÍFICA DE UM RECURSO NO BACKEND
// => DELETE = DELETAR UM RECURSO NO BACKEND

// - Http
//     - Metodo HTTP
//     - URL

// GET /users
// POST /users

// Stateful != Stateless
// Stateful => sempre guarda qualquer tipo de informação em memória
// Stateless => Guarda as informações em bancos, por exemplo

//req => exemplo, ao se criar um usuário(name, email,pwd), obtemos todas essas informações
//res => devolve a resposta para quem está chamado a requisicao

//JSON -> Javascript Object Notation

//Cabecalhos (Requisicao/resposta) => Metadata

// //HTTP Status Code
// 100 - 199 => informationanl responses
// 200 - 299 => Successful
// 300 - 399 => Redireciton
// 400 - 499 => Client Error
// 500 - 599 => Server Error

const users = []

const server = http.createServer(async(request, response)=>{ //criando servidor

    const { method, url } = request //mesma coisa que const method = req.method (desestruturação), aqui a requisição foi recebida
    
    await json(request,response) // aqui a requisição foi interceptada pelo middleware

    if(method === "GET" && url === "/users"){
        return response.end(JSON.stringify(users)) //justifica a estrutura de dados para [{obj}]
    }
    if(method === "POST" && url === "/users"){ // se o metodo da requisicao for POST e a url for /users, criará o user
        const { name, email } = request.body        
        users.push({
            id: Math.random(),
            name,
            email,
        })
        return response.writeHead(201).end('Criação de usuário')
    }

    return response.writeHead(404).end("Not Found...")
})

server.listen(3333)

//ESModule => import, export