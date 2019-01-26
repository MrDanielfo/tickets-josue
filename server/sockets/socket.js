const { io } = require('../server');

const { TicketControl } = require('../classes/TicketControl')

const ticketControl = new TicketControl(); 
// Al hacerlo, se dispara el constructor 

io.on('connection', (client) => {

    console.log('Usuario conectado');

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguienteTicket()

        console.log(siguiente)
        callback(siguiente)

    });

    client.emit('estadoActual', {
        ultimoTicket : ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatro()
    })

    client.broadcast.emit('ultimosCuatro', {
        ultimosCuatro: ticketControl.getUltimosCuatro()
    });

    client.on('atenderTicket', (data, callback) => {

        if(!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio)

        callback(atenderTicket)

    })




    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    

});