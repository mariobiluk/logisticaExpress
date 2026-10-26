const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const authMiddleware = require('./middleware/auth.middleware')
const funcionarioController = require('./controller/funcionario.controller')
const authController = require('./controller/auth.controller')
const motoristaController = require('./controller/motorista.controller')
const hostname = 'localhost'
const PORT = 3000

//middleware

app.use(express.urlencoded({ extende: true }))
app.use(express.json())
app.use(cors())

//rotas publicas
app.post('/funcionario', funcionarioController.cadastrar)
app.post('/login', authController.logar)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Aplicação rodando!s' })
})

//rotas privadas
app.use(authMiddleware)

app.post('/motorista', motoristaController.cadastrar)

//server

conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Aplicação rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro ao conectar ao bd', err)
    })