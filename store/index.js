import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

export const plugins = [
  createPersistedState({
    key: 'ttd',
    storage: {
      getItem: (key) => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value),
      removeItem: (key) => Cookies.remove(key),
    },
  }),
]

export const state = () => ({
  authToken: '',
  username: '',
})

export const mutations = {
  setToken(state, token) {
    state.authToken = token
  },
  setUsername(state, username) {
    state.username = username
  },
}
