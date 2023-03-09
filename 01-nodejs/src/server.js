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

//UUID => Unique Universal ID

// FORMAS DO FRONT-END ENVIAR SOLICITAÇÕES
// -> Query Parameters : parametros nomeados no prórpio endereço da aplicação, ex: http://localhost:3000/users?userId=1&...., URL Statefull => Filtros, paginação, não-obrigatórios
// -> Route Parameters : parametros NÃO nomeados no prórpio endereço da aplicação, ex: http://localhost:3000/users/1...., Identificação de recurso
// -> Request Body : Envio de informações de um formulário (HTTPs)

import http from 'node:http' //modulo intrno não é necessário instalação, por padrão colocasse node:
import  { json }  from './middlewares/json.js'
import { routes } from './routes.js'

const server = http.createServer(async(request, response)=>{ //criando servidor

    const { method, url } = request //mesma coisa que const method = req.method (desestruturação), aqui a requisição foi recebida
    
    await json(request,response) // aqui a requisição foi interceptada pelo middleware

    const route = routes.find(route => {
        return route.method === method && route.path === url
    })

    if(route){
        return route.handler(request,response)
    }

    return response.writeHead(404).end("Not Found...")
})

server.listen(3333)

//ESModule => import, export