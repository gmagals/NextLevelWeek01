//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose() //retorna o objeto sqlite3 para uma variavel
//iniciar o objeto que irá fazer operações no de banco de dados 
const db = new sqlite3.Database("./src/database/database.db") //new inicia um novo objeto desde que um nome que esteja sendo retorna é um constructor ou classe
//utilizar o objeto de banco de dados para nossas operações
module.exports = db
//shift + alt + a comenta td
db.serialize(() => {
    //Criar uma tabela
    /* db.run(
        //com comandos sql
        // 1 criar uma tabela com comandos s
        `
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
            );`
    )
    // 2 inserir dados na tabela
    const query = `INSERT INTO places (image,
        name,
        address,
        address2,
        state,
        city,
        items) 
        VALUES (?,?,?,?,?,?,?);`
    const values = [
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]
    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso.")
        console.log(this) //quando se usa "this", => n é permitido.
    }
    db.run(query, values, afterInsertData) */

    // 3 consultar os dados da tabela
    //db.all(`SELECT name FROM places`, function (err, rows) {
    //  if (err) {
    //    return console.log(err)
    //}
    //console.log("Aqui estão seus registros: ")
    //console.log(rows)
    //})
    // 4 deletar um dado na tabela/
   /*  db.run(`DELETE FROM places WHERE id = ?`, [3], function (err) {
      if (err) {
         return console.log(err)
    }
    console.log("Registro deletado com sucesso.")
    }) */
})
    //vai rodar uma sequencia de cod