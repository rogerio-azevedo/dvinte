const socketio = require('socket.io')

let onlineUsers = []
const messages = []

exports.setupWebsocket = server => {
  const io = socketio(server)

  io.on('connection', socket => {
    console.log(`Server has a new connection Id:${socket.id}`)

    io.emit('CONNECTED_USERS', onlineUsers)
    io.emit('PREVIOUS_MESSAGES', messages)

    socket.on('USER_CONNECTED', user => {
      onlineUsers.push(user)
      io.emit('USER_CONNECTED', user)
    })

    socket.on('chat.message', messageData => {
      messages.push(messageData)
      io.emit('chat.message', messageData)
      console.log(messageData)
    })

    socket.on('USER_DISCONNECTED', user => {
      onlineUsers = onlineUsers.filter(u => u.id !== user.id)
      io.emit('USER_DISCONNECTED', user)
    })
  })
}
