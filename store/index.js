import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

export const plugins = [
  createPersistedState({
    key: 'ttd',
    paths: ['auth', 'chat1', 'chat2', 'results'],
    storage: {
      getItem: (key) => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value),
      removeItem: (key) => Cookies.remove(key),
    },
  }),
]

export const state = () => ({})

export const mutations = {}
