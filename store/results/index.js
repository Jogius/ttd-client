export const state = () => ({
  votedCorrect: null,
  doubleBot: false,
  username: '',
})

export const mutations = {
  setVotedCorrect(state, votedCorrect) {
    state.votedCorrect = votedCorrect
  },
  setDoubleBot(state) {
    state.doubleBot = true
  },
  setUsername(state, username) {
    state.username = username
  },
  reset(state) {
    state.votedCorrect = null
    state.doubleBot = false
  },
}
