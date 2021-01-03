import { io } from 'socket.io-client'
import config from '~/assets/config'

export default function (app, inject) {
  const socket = io(`${config.SERVER_URL}/user`)

  socket.on('status', (status) => {
    if (status.started) app.store.commit('status/start')
    if (status.chatting) app.store.commit('status/startChatting')
    if (status.voting) app.store.commit('status/startVoting')
    if (status.results) app.store.commit('status/startResults')
  })
  socket.on('status/start', () => {
    app.store.commit('status/start')
  })
  socket.on('status/stop', () => {
    app.store.commit('status/stop')
  })
  socket.on('status/startChatting', () => {
    app.store.commit('status/startChatting')
    app.redirect(200, '/chats')
  })
  socket.on('status/stopChatting', () => {
    app.store.commit('status/stopChatting')
  })
  socket.on('status/startVoting', () => {
    app.store.commit('status/startVoting')
    app.redirect(200, '/')
  })
  socket.on('status/stopVoting', () => {
    app.store.commit('status/stopVoting')
  })
  socket.on('status/startResults', () => {
    app.store.commit('status/startResults')
  })
  socket.on('status/stopResults', () => {
    app.store.commit('status/stopResults')
  })
  socket.on('reset/status', () => {
    app.store.commit('status/reset')
  })
  socket.on('reset/all', () => {
    app.store.commit('auth/reset')
    app.store.commit('chat1/reset')
    app.store.commit('chat2/reset')
    app.store.commit('status/reset')
    app.redirect(200, '/')
    window.location.reload()
  })
  socket.on('reset/status', () => {
    app.store.commit('status/reset')
    window.location.reload()
  })
  socket.on('reset/messages', () => {
    app.store.commit('chat1/reset')
    app.store.commit('chat2/reset')
    window.location.reload()
  })

  if (app.store.state.auth.userToken) {
    socket.emit('auth/newSocket', app.store.state.auth.userToken)
  } else {
    socket.emit('auth/newConnection')
  }

  socket.on('chat1/message', (message) => {
    app.store.commit('chat1/receiveMessage', message)
  })

  socket.on('chat2/message', (message) => {
    app.store.commit('chat2/receiveMessage', message)
  })

  inject('socket', socket)
}
