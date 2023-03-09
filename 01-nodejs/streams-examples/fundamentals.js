// Streams -> 

// process.stdin  stdin => tudo que o usuário digita no terminal, ou seja stdin é uma escrite de leitura
//     .pipe(process.stdout) stdout => saída no terminal, .pipe() encaminhar para uma saída, ou seja stdout é uma stream de escrite


import {Readable, Transform, Writable} from 'node:stream'

class OneToHundredStream extends Readable{
    index = 1
    
    _read(){ //metodo obrigatório que retorna todos os dados dessa stream
        const i = this.index++

        setTimeout(() => {
            if(i > 100){
                this.push(null)
            }else{
                const buf = Buffer.from(String(i)) //necessario conversão para buffer pq dentro de streams n pode se trabalhar com tipos primitivos, e depois convertido para String pois o buf não lê Int
                this.push("\n"+buf)
            }
        },1000) //aguarda 1s para ser printado no terminal
    }
}

class MultiplyByTenStream extends Writable{
    _write(chunck, encoding, callback){ // (pedaço que foi lido do pedaço de leitura, como essa informaç~çao está codificada, funcção que a stream de escrita chama quando termina de processar o dado)
        console.log(Number(chunck.toString()) * 10)
        callback()
    }
}

class InverseNumber extends Transform{
    _transform(chunck,encoding,callback){
        const transformed = Number(chunck.toString()) * -1
        callback(null, Buffer.from(String(transformed))) // primeiro paramentro do callback é um erro, a transfomação
    }
}

new OneToHundredStream()
    .pipe(new InverseNumber())
    .pipe(new MultiplyByTenStream())