const {io} = require('../index');

// mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });
    // escuchar
    client.on('mensaje', (payload) => {
        console.log('Mensaje!!', payload);
        // emitir
        io.emit('mensaje', { admin: 'nuevo mensaje' });
    })
  });