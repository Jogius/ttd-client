export const state = () => ({
  started: false,
  chatting: false,
  voting: false,
  results: false,
})

export const mutations = {
  start(state) {
    state.started = true
  },
  end(state) {
    state.started = false
  },
  startChatting(state) {
    state.chatting = true
  },
  endChatting(state) {
    state.chatting = false
  },
  startVoting(state) {
    state.voting = true
  },
  endVoting(state) {
    state.voting = false
  },
  startResults(state) {
    state.results = true
  },
  endResults(state) {
    state.results = false
  },
}
