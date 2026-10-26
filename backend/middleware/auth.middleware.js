const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

function authMiddleware(req, res, next) {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(400).json({ message: 'Acesso negado. Token nã informado' })
    }

    try {
        const bytes = cryptoJs.AES.decrypt(token, CHAVE_SECRETA)
        const dadosDescriptografados = bytes.toString(cryptoJs.enc.Utf8)

        if (!dadosDescriptografados) {
            return res.status(400).json({ message: 'Token inválido. Faça login novamente!' })
        }

        const payload = JSON.parse(dadosDescriptografados)

        if (Date.now() > payload.expiraEm) {
            return res.status(400).json({ message: 'Sessão expirada. Faça login novamente!' })
        }

        req.usuario = payload
        next()
    } catch (err) {
        console.error('Falha na autenticação do token', err)
    }
}

module.exports = authMiddleware