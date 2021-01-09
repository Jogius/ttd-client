export const state = () => ({
  userToken: '',
  username: '',
  adminHasAuthenticated: false,
})

export const mutations = {
  setToken(state, userToken) {
    state.userToken = userToken
  },
  setUsername(state, username) {
    state.username = username
  },
  setAdmin(state) {
    state.adminHasAuthenticated = true
  },
  reset(state) {
    state.userToken = ''
    state.username = ''
    state.adminHasAuthenticated = false
  },
}
