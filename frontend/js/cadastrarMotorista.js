const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const nome = document.getElementById('nome').value 
    const cnh = document.getElementById('cnh').value 
    const cpf = document.getElementById('cpf').value 
    const telefone = document.getElementById('telefone').value 

    const valores = {
        nome: nome,
        cnh: cnh,
        cpf: cpf,
        telefone: telefone
    }

    fetch('http://localhost:3000/motorista', {
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
        console.error('Erro ao cadastrar motorista:', err)
        resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
    })
})