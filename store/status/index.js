export const state = () => ({
  started: false,
  chatting: false,
  voting: false,
  results: false,
  voted: false,
})

export const mutations = {
  start(state) {
    state.started = true
  },
  stop(state) {
    state.started = false
  },
  startChatting(state) {
    state.chatting = true
  },
  stopChatting(state) {
    state.chatting = false
  },
  startVoting(state) {
    state.voting = true
  },
  stopVoting(state) {
    state.voting = false
  },
  startResults(state) {
    state.results = true
  },
  stopResults(state) {
    state.results = false
  },
  setVoted(state, voted) {
    state.voted = voted
  },
  reset(state) {
    state.started = false
    state.chatting = false
    state.voting = false
    state.results = false
    state.voted = false
  },
}
