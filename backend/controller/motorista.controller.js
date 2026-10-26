const Motorista = require('../models/Motorista')
const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.nome || !valores.cnh || !valores.cpf||!valores.telefone) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    try {
        const cnhCripto = cryptoJs.AES.encrypt(valores.cnh, CHAVE_SECRETA).toString()
        const cpfCripto = cryptoJs.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()

        await Motorista.create({
            nome: valores.nome,
            cnh: cnhCripto,
            cpf: cpfCripto,
            telefone: valores.telefone,
        })

        return res.status(201).json({ message: 'Motorista cadastrado com sucesso!' })
    } catch (err) {

        console.error('erro ao cadastrar Motorista', err)
        return res.status(500).json({ message: 'Erro ao cadastrar Motorista ' })

    }
}

const listar = async (req, res) => {

    try {
        const funcionario = require()

        await Motorista.create({
            nome: valores.nome,
            cnh: cnhCripto,
            cpf: cpfCripto,
            telefone: valores.telefone,
        })

        return res.status(201).json({ message: 'Motorista cadastrado com sucesso!' })
    } catch (err) {

        console.error('erro ao cadastrar Motorista', err)
        return res.status(500).json({ message: 'Erro ao cadastrar Motorista ' })

    }
}


module.exports = { cadastrar }