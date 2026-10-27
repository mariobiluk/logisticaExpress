const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const authMiddleware = require('./middleware/auth.middleware')
const funcionarioController = require('./controller/funcionario.controller')
const authController = require('./controller/auth.controller')
const motoristaController = require('./controller/motorista.controller')
const cargaController = require('./controller/carga.controller')
const entregaController = require('./controller/entrega.controller')
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
app.get('/motoristas', motoristaController.listar)
app.get('/motorista/:id', motoristaController.consultar)
app.put('/motorista/:id', motoristaController.atualizar)
app.delete('/motorista/:id', motoristaController.apagar)

app.post('/carga', cargaController.cadastrar)

app.post('/entrega', entregaController.cadastrar)
app.get('/entregas',entregaController.listar)
app.put('/entrega/:id',entregaController.atualizar)


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