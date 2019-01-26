// Comando para establecer comunicación

let socket = io(); 

socket.on('connect', function() {
  console.log('conectado');
});

socket.on('disconnect', function() {
  console.log('Perdimos conexión');
});

const labelTicket = document.getElementById('lblNuevoTicket');


eventListeners()

function eventListeners() {

    let btnTicket = document.getElementById('nuevoTicket')

    
    btnTicket.addEventListener('click', siguienteTicket);

    document.addEventListener('DOMContentLoaded', ultimoTicket)
   
}

function siguienteTicket() {
    
    socket.emit('siguienteTicket', null , function (siguienteTicket) {
        
        labelTicket.innerText = siguienteTicket

    })

}

function ultimoTicket() {

    // Listner del lado del cliente
    socket.on('estadoActual', function (response) {
        labelTicket.innerText = response.ultimoTicket
    })

}


