export async function json(request,response){
    const buf = []

    for await (const chunck of request){
        buf.push(chunck)
    } //o await aguarada que cada pedaço da stream seja retornado

    try{
        request.body = JSON.parse(Buffer.concat(buf).toString())
    }catch{
        request.body = null
    }

    response.setHeader('Content-type', 'application/json')
}
