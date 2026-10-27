const Entrega = require('../models/Entrega')


const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.cidadeDestino || !valores.statusAtual || !valores.dataHora || !valores.idCarga) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    try {

        await Entrega.create(valores)

        return res.status(201).json({ message: 'Entrega cadastrada com sucesso!' })
    } catch (err) {

        console.error('erro ao cadastrar Entrega', err)
        return res.status(500).json({ message: 'Erro ao cadastrar Motorista ' })

    }
}

const listar = async (req, res) => {
    try {
        const entregas = await Entrega.findAll({
            order: [['dataHora', 'ASC']]
        })

        return res.status(200).json(entregas)
    } catch (err) {
        console.error('Erro ao listar entregas:', err)
        return res.status(500).json({message: 'Erro ao listar entregas!'})
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    try {
        const entrega = await Entrega.findByPk(id)
        if (!entrega) {
            return res.status(404).json({ message: 'Entrega não encontrada!' })
        }

        const dadosAtualizados = { ...valores }

        await Entrega.update(dadosAtualizados, { where: { codEntrega: id } })
        return res.status(200).json({ message: 'Entrega atualizada com sucesso!' })
    } catch (err) {
        console.error('Erro ao atualizar Entrega:', err)
        return res.status(500).json({ message: 'Erro ao atualizar Entrega!' })
    }
}

module.exports = { cadastrar, listar, atualizar }