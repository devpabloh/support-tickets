import fs from "node:fs/promises"

const DATABASE_PATH = new URL("db.json", import.meta.url) // aqui a gente está dizendo qual é o arquivo para as informações serem salvas e qual o caminho no qual ele se encontra.

export class Database{
  #database = {} // aqui usamos o # para deixar o mesmo como privado, para que ele não apareça como um parametro para ser usado por usuário externo.

  constructor(){
    // fs.readFile() utilizado para ler o arquivo, no primeiro parâmetro a gente passa o arquivo e no segundo parâmetro a gente passa o incoding.
    fs.readFile(DATABASE_PATH, "utf-8")
    .then((data)=>{
      this.#database = JSON.parse(data) // Aqui estámos dizendo que se houver dados no banco de dados devemos pegar esses dados e passar eles de string para JSON.
    }) // se der certo, recuperar os dados para executar a função.
    .catch(()=>{
      this.#persist()
    }) // se der errado
  }

  #persist(){
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database)) // Aqui nós estamos reescrevendo o arquivo que é o primeiro parâmetro e no segundo parâmetro estamos passando ele de JSON para string, passando como base o nosso banco de dados.
  }

  insert(table, data){
    if(Array.isArray(this.#database[table])){ // se encontrar o parâmetro tabela dentro do banco de dados, faça isso
      this.#database[table].push(data) // adicione os dados a essa tabela
    }else{
      this.#database[table] = [data]
    }

    this.#persist() // esse comando serve para chamar o método de persistir, para ficar tentando salvar os dados na tabela
  }

  select(table, filters){
    let data = this.#database[table] ?? [] 

    if(filters){
      data = data.filter((row)=>{
        
        return Object.entries(filters).some(([key, value])=>{
          return row[key].toLowerCase().includes(value.toLowerCase())
        })

      })
    }
    
    return data
  }

}