const { Motorista, Carga, Entrega,Funcionario } = require('./models/rel')
const conn = require('./db/conn')

async function syncDataBase() {

    try{
        await conn.sync({force: true})
        console.log('sincronizando tabelas')
    }catch(err){
        console.error('erro ao sincronizar tabelas')
    }finally{
        await conn.close()
        console.log('tabelas sincronizadas!')
    }
}

syncDataBase()