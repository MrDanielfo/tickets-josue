// Comando para establecer comunicación

let socket = io();

const label1 = document.getElementById('lblTicket1');
const label2 = document.getElementById('lblTicket2');
const label3 = document.getElementById('lblTicket3');
const label4 = document.getElementById('lblTicket4');

const escritorio1 = document.getElementById('lblEscritorio1');
const escritorio2 = document.getElementById('lblEscritorio2');
const escritorio3 = document.getElementById('lblEscritorio3');
const escritorio4 = document.getElementById('lblEscritorio4');

let tickets = [label1, label2, label3, label4]
let escritorios = [escritorio1, escritorio2, escritorio3, escritorio4]

socket.on('connect', function() {
  console.log('conectado');
});

socket.on('disconnect', function() {
  console.log('Perdimos conexión');
});


socket.on('estadoActual', function (data) {
    //console.log(data)
    //console.log(data.ultimosCuatro)
    actualizaHTML(data.ultimosCuatro)
})

socket.on('ultimosCuatro', function (data) {
    //console.log(data)

    let audio = new Audio('audio/new-ticket.mp3')
    console.log(audio)
    //audio.play()
    actualizaHTML(data.ultimosCuatro)
})


function actualizaHTML( ultimosCuatro ) {

    ultimosCuatro.forEach((elemento, index) => {
        tickets[index].innerText = `Ticket: ${elemento.numero}`
        escritorios[index].innerText = `Escritorio:  ${elemento.escritorio}`;
    });


}