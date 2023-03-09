import  http  from 'node:http'
import { Transform } from 'node:stream'

class InverseNumber extends Transform{
    _transform(chunck,encoding,callback){
        const transformed = Number(chunck.toString()) * -1
        console.log(transformed)
        callback(null, Buffer.from(String(transformed))) // primeiro paramentro do callback é um erro, a transfomação
    }
}

// req => RaedableStream
// res =. WritetableStream

const server = http.createServer(async (req,res) => {

    const buf = []

    for await (const chunck of req){
        buf.push(chunck)
    } //o await aguarada que cada pedaço da stream seja retornado

    const fullStreamContent = Buffer.concat(buf).toString()

    console.log(fullStreamContent)
    return res.end(fullStreamContent)

    // return req
    //     .pipe(new InverseNumber())
    //     .pipe(res)
})

server.listen(3334)