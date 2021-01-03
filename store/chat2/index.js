export const state = () => ({
  messages: [],
})

export const mutations = {
  receiveMessage(state, message) {
    state.messages.push({ content: message, me: false })
  },
  sendMessage(state, message) {
    state.messages.push({ content: message, me: true })
  },
  removeMessage(state) {
    state.messages.pop()
  },
  reset(state) {
    state.messages = []
    state.socket = undefined
  },
}
