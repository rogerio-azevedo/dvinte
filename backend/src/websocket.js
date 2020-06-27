const socketio = require('socket.io')

let io
let onlineUsers = []
const messages = []

exports.setupWebsocket = server => {
  io = socketio(server)

  io.on('connection', socket => {
    // console.log(`Server has a new connection Id:${socket.id}`)

    io.emit('CONNECTED_USERS', onlineUsers)
    io.emit('PREVIOUS_MESSAGES', messages)

    socket.on('USER_CONNECTED', user => {
      onlineUsers.push(user)
      io.emit('USER_CONNECTED', user)
    })

    socket.on('USER_DISCONNECTED', user => {
      onlineUsers = onlineUsers.filter(u => u.id !== user.id)
      io.emit('USER_DISCONNECTED', user)
    })

    socket.on('chat.message', messageData => {
      messages.push(messageData)
      io.emit('chat.message', messageData)
      // console.log(messages)
    })

    socket.on('init.message', messageData => {
      messages.push(messageData)
      io.emit('init.message', messageData)
    })

    socket.on('token.message', messageData => {
      messages.push(messageData)
      io.emit('token.message', messageData)
    })
  })
}

exports.saveMessage = message => {
  io.emit('chat.message', message)
}

exports.saveNote = message => {
  io.emit('note.message', message)
}

exports.addInitiative = message => {
  io.emit('init.message', message)
}

exports.updateToken = message => {
  io.emit('token.message', message)
}
