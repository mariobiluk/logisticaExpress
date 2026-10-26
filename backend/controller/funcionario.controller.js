const Funcionario = require('../models/Funcionario')
const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.nome || !valores.email || !valores.senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    try {
        const senhaCripto = cryptoJs.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()

        await Funcionario.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCripto
        })

        return res.status(201).json({ message: 'Funcionário cadastrado com sucesso!' })
    } catch (err) {

        console.error('erro ao cadastrar funcionario', err)
        return res.status(500).json({ message: 'Erro ao cadastrar funcionario ' })

    }
}

module.exports = { cadastrar }