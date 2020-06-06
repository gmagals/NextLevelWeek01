const express = require("express")
const server = express()
//pegar o bd
const db = require("./database/db.js")
//configurar pasta publica
server.use(express.static("public"))
//habilidar o uso do req.body na nossa aplicacao
server.use(express.urlencoded({ extended: true }))
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})
//configurar o caminho da app
//pagina inicial
//req: requisição
//res: resposta
server.get("/", (req, res) => {
    res.render("index.html", {
        title: "Seu marketplace de coleta de resíduos"
    })
})


server.get("/create-point", (req, res) => {
    //res.query é a query string da nossa url
    //console.log(req.query)
    return res.render("create-point.html")

})


server.post("/savepoint", (req, res) => {

    //req.body é o mesmo que o corpo do form

    //inserir dados no bd
    const query = `INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items) 
        VALUES (?,?,?,?,?,?,?);`
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items

    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com sucesso.")
        console.log(this) //quando se usa "this", => n é permitido.
        return res.render("create-point.html", { saved: true })
    }
    db.run(query, values, afterInsertData)
})

server.get("/search-results", (req, res) => {

    const search = req.query.search

    if(search == "") {
        // pesquisa vazia
        return res.render("search-results.html", { total: 0})
    }

    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total})
    })
})

/* server.get("/search-results", (req, res) => {
    //pegar os dados do bd
    const search = req.query.search

    if (search == "") {
        //pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }

    db.all(`SELECT * FROM places WHERE city LIKE = '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length
        //mostrar a pag html com os dados do bd
        return res.render("search-results.html", { places: rows, total: total })
    })
}) */
//ligar o servidor
server.listen(3000)