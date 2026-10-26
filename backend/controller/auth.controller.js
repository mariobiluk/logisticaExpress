const Funcionario = require('../models/Funcionario')
const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const logar = async (req, res) => {
    const valores = req.body

    if (!valores.email || !valores.senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    try {
        const funcionario = await Funcionario.findOne({ where: { email: valores.email } })
        if (!funcionario) {
            return res.status(400).json({ message: 'Email inválido, tente novamente!' })
        }

        const bytes = cryptoJs.AES.decrypt(funcionario.senha, CHAVE_SECRETA)
        const senhaDescriptografada = bytes.toString(cryptoJs.enc.Utf8)

        if (valores.senha !== senhaDescriptografada) {
            return res.status(400).json({ message: 'Senha inválida, tente novamente!' })
        }

        const minsEmMs = 3 * 60 * 60 * 1000
        const tempoParaExpirar = Date.now() + minsEmMs

        const payload = {
            idFuncionario: funcionario.codFuncionario,
            nome: funcionario.nome,
            expiraEm: tempoParaExpirar
        }

        const token = cryptoJs.AES.encrypt((JSON.stringify(payload)), CHAVE_SECRETA).toString()

        return res.status(200).json({
            messsage: 'Funcionário logado!',
            nome: funcionario.nome,
            token: token
        })

    } catch (err) {

        console.error('erro ao logar funcionario', err)
        return res.status(500).json({ message: 'Erro ao logar funcionario ' })

    }
}

module.exports = { logar }