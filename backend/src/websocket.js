const socketio = require('socket.io')

exports.setupWebsocket = server => {
  const io = socketio(server)

  io.on('connection', socket => {
    console.log(`Server has a new connection Id:${socket.id}`)

    socket.on('chat.message', data => {
      console.log('[SOCKET] Chat.message => ', data)
      io.emit('chat.message', data)
    })

    socket.on('disconnect', () => {
      console.log('[SOCKET] Disconnect => A connection was disconnected')
    })
  })
}
