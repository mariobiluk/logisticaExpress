const Motorista = require('../models/Motorista')
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.nome || !valores.cnh || !valores.cpf || !valores.telefone) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    try {
        const cnhCripto = CryptoJS.AES.encrypt(valores.cnh, CHAVE_SECRETA).toString()
        const cpfCripto = CryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()

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
        const motoristas = await Motorista.findAll()
        let resultado = []

        motoristas.forEach((el) => {
            let cnhDescriptografada = ''
            let cpfDescriptografado = ''
            try {
                const bytes2 = CryptoJS.AES.decrypt(el.cnh, CHAVE_SECRETA)
                cnhDescriptografada = bytes2.toString(CryptoJS.enc.Utf8)

                const bytes = CryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA)
                cpfDescriptografado = bytes.toString(CryptoJS.enc.Utf8)

            } catch (err) {
                cnhDescriptografada = 'Erro ao descriptografar'
                console.error(cnhDescriptografada, err)

                cpfDescriptografado = 'Erro ao descriptografar'
                console.error(cpfDescriptografado, err)
            }
            resultado.push({
                codMotorista: el.codMotorista,
                nome: el.nome,
                cnh: cnhDescriptografada,
                cpf: cpfDescriptografado,
                telefone: el.telefone,
            })
        })

        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Erro ao listar motoristas:', err)
        return res.status(500).json({ message: 'Erro ao listar motoristas!' })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id
    try {
        const motorista = await Motorista.findByPk(id)
        if (!motorista) {
            return res.status(404).json({ message: 'Motorista não encontrado!' })
        }

        const bytes = CryptoJS.AES.decrypt(motorista.cpf, CHAVE_SECRETA)
        console.log('bytes = ', bytes)
        const cpfDescriptografado = bytes.toString(CryptoJS.enc.Utf8)
        console.log('cpf descriptografado = ', cpfDescriptografado)

        const bytes2 = CryptoJS.AES.decrypt(motorista.cnh, CHAVE_SECRETA)
        console.log('bytes = ', bytes2)
        const cnhDescriptografada = bytes2.toString(CryptoJS.enc.Utf8)
        console.log('cpf descriptografado = ', cnhDescriptografada)

        return res.status(200).json({
            codMotorista: motorista.codMotorista,
            nome: motorista.nome,
            cnh: cnhDescriptografada,
            cpf: cpfDescriptografado,
            telefone: motorista.telefone,
        })
    } catch (err) {
        console.error('Erro ao consultar motorista:', err)
        return res.status(500).json({ message: 'Erro ao consultar motorista!' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    try {
        const motorista = await Motorista.findByPk(id)
        if (!motorista) {
            return res.status(404).json({ message: 'Motorista não encontrado!' })
        }

        const dadosAtualizados = { ...valores }

        if (valores.cpf) {
            if (valores.cpf.length !== 11) {
                return res.status(400).json({ message: 'O CPF deve conter exatamente 11 dígitos!' })
            }
            dadosAtualizados.cpf = CryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
        }

        if (valores.senha) {
            dadosAtualizados.senha = CryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()
        }

        await Motorista.update(dadosAtualizados, { where: { codMotorista: id } })
        return res.status(200).json({ message: 'Motorista atualizado com sucesso!' })
    } catch (err) {
        console.error('Erro ao atualizar motorista:', err)
        return res.status(500).json({ message: 'Erro ao atualizar motorista!' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const motorista = await Motorista.findByPk(id)
        if (!motorista) {
            return res.status(404).json({ message: 'Motorista não encontrado!' })
        }

        await Motorista.destroy({ where: { codMotorista: id } })
        return res.status(200).json({ message: 'Motorista excluído com sucesso!' })
    } catch (err) {
        console.error('Erro ao apagar motorista:', err)
        return res.status(500).json({ message: 'Erro ao apagar motorista!' })
    }
}



module.exports = { cadastrar, listar, consultar, apagar, atualizar }