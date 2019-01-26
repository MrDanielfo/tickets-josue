let socket = io();

socket.on('connect', function () {
    console.log('conectado');
});

socket.on('disconnect', function () {
    console.log('Perdimos conexión');
});

// Obtener parámetros por URL con Javascript

let searchParams = new URLSearchParams( window.location.search )

if(!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario')
}

const escritorio = searchParams.get('escritorio')

const tituloEscritorio = document.getElementById('escritorio')

const atEscritorio = document.getElementById('atEscritorio');

const btnAtender = document.getElementById('atenderTicket');

eventListeners()

function eventListeners() {

    btnAtender.addEventListener('click', atenderTicket)

    document.addEventListener('DOMContentLoaded', escritorioActual)

}

function escritorioActual() {
    
    tituloEscritorio.innerText = escritorio

}

function atenderTicket() {

    socket.emit('atenderTicket', {escritorio: escritorio}, function (response) {
        console.log(response)

        if(response === 'No hay tickets') {
            
            atEscritorio.innerText = response;
            return
        }
        
        atEscritorio.innerText = response.numero
        

        

    })

}

