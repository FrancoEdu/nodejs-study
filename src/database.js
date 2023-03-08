//{ "users" : [...]}
import fs from 'node:fs/promises'

const dataBasePathName = new URL('../db.json', import.meta.url)

export class Database{
    #database = {}

    constructor(){
        fs.readFile(dataBasePathName, 'utf-8').then(data =>{
            this.#database = JSON.parse(data) // puxa as informações do db.json
        }).catch(() =>{
            this.#persist() // caso não exista o banco ele cria mesmo que vazio
        })
    }

    #persist(){
        fs.writeFile(dataBasePathName, JSON.stringify(this.#database)) //escreve no arquivo db.json o dado recebido da inserção
    }

    select(table){
        const data = this.#database[table] ?? [] //procura se a tablea existe, caso não exista, retorna um array vazia
        return data
    }

    insert(table, data){
        if(Array.isArray(this.#database[table])){ //se já existe um array inserido nessa tabela
            this.#database[table].push(data) //insere na tabela o dado 
        }else{
            this.#database[table] = [data]
        }

        this.#persist()

        return data
    }
}