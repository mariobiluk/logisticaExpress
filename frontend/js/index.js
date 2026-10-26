const verificarLog = document.getElementById('verificarLog')
const token = localStorage.getItem('token')
const nome = localStorage.getItem('nomeFuncionario')

if(token){
    verificarLog.innerHTML += ` <a href="#" id="btn_logout">Logout</a>&emsp;`
    verificarLog.innerHTML += `     <span class="titulo_nav">${nome}</span>`

    const btn_logout = document.getElementById('btn_logout')

    btn_logout.addEventListener('click',()=>{
        localStorage.clear()
        location.reload()
    })
}else{
    verificarLog.innerHTML+= `<a href="./html/login.html">Login</a>&emsp;`
}