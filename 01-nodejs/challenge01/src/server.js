import http from 'node:http' //modulo intrno não é necessário instalação, por padrão colocasse node:
import  { json }  from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const server = http.createServer(async(request, response)=>{ //criando servidor

    const { method, url } = request //mesma coisa que const method = req.method (desestruturação), aqui a requisição foi recebida
    
    await json(request,response) // aqui a requisição foi interceptada pelo middleware

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(route){
        const routeParams = request.url.match(route.path)

        const { query, ...params} = routeParams.groups
        request.params = params
        request.query = query ? extractQueryParams(query) : {}

        return route.handler(request,response)
    }

    return response.writeHead(404).end("Not Found...")
})

server.listen(3333)