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

    select(table, search){
        let data = this.#database[table] ?? [] //procura se a tablea existe, caso não exista, retorna um array vazia

        if(search){
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }
        
        return data
        
    }

    delete(tabela, data){
        const rowIndex = this.#database[tabela].findIndex(row => row.id === data) //busca o id passado em data em determinada tabela

        if(rowIndex > -1){
            this.#database[tabela].splice(rowIndex, 1)
            this.#persist()
        }
    }

    change(tabela, id, data){
        
        const rowIndex = this.#database[tabela].findIndex(row => row.id === id)

        if(rowIndex > -1){
            this.#database[tabela][rowIndex] = {id, ...data}
            this.#persist()
        }
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