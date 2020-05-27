import socketio from 'socket.io-client'

const socket = socketio(process.env.REACT_APP_API_URL, {
  autoConnect: false,
})

function connect() {
  socket.connect()

  socket.on('connect', () =>
    // eslint-disable-next-line
    console.log('[IO] Connect => A new connection has been established')
  )
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect()
  }
}

export { connect, disconnect, socket }
