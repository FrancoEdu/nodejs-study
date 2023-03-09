import fs from 'node:fs/promises'

const dataBasePathName = new URL('../db.json', import.meta.url)

export class Database{
    #database = {}

    constructor(){
        fs.readFile(dataBasePathName, 'utf-8').then(data => {
            this.#database = JSON.parse(data)//puxando informações do banco
        }).catch(() => {
            this.#persist() //caso não exista o banco, criar
        })
    }

    #persist(){
        fs.writeFile(dataBasePathName, JSON.stringify(this.#database))//escreve o banco no arquivo db.json
    }

    select(tabela,search){
        let data = this.#database[tabela] ?? []//procura se a tablea existe, caso não exista, retorna um array vazia
        
        if(search){
            data = data.filter(row => {
                return Object.entries(search).some(([key,value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        return data
    }

    insert(tabela, data){

    }

    delete(tabela, id){

    }

    update(tabela, id, data){

    }

}