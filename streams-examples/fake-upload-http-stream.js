import {Readable} from 'node:stream'

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