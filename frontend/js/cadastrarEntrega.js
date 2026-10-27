const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const cidadeDestino = document.getElementById('cidadeDestino').value 
    const statusAtual = document.getElementById('statusAtual').value 
    const dataHora = document.getElementById('dataHora').value 
    const idCarga = document.getElementById('idCarga').value 

    const valores = {
        cidadeDestino: cidadeDestino,
        statusAtual: statusAtual,
        dataHora: dataHora,
        idCarga: idCarga,
    }

    fetch('http://localhost:3000/entrega', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })

    .then(res => {
        if (!res.ok) {
            localStorage.clear()
            alert('Faça login novamente, tempo expirado!')
            location.href = '../index.html'
            throw new Error('Sessão expirada')
        }
        return res.json()
    })
    .then(dados => {
        resposta.innerHTML = `<p>${dados.message}</p>`
        document.querySelector('form').reset()
    })
    .catch(err => {
        console.error('Erro ao cadastrar entrega:', err)
        resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
    })
})