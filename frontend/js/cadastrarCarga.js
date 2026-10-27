const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const descricao = document.getElementById('descricao').value 
    const peso = document.getElementById('peso').value 
    const volume = document.getElementById('volume').value 
    const codRastreio = document.getElementById('codRastreio').value 
    const idMotorista = document.getElementById('idMotorista').value 

    const valores = {
        descricao: descricao,
        peso: peso,
        volume: volume,
        codRastreio: codRastreio,
        idMotorista: idMotorista
    }

    fetch('http://localhost:3000/carga', {
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
        console.error('Erro ao cadastrar carga:', err)
        resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
    })
})