import config from '~/assets/config'

export default function (app) {
  app.$axios
    .$get(`${config.SERVER_URL}/status`)
    .then((res) => {
      if (res.started) app.store.commit('status/start')
      if (res.chatting) app.store.commit('status/startChatting')
      if (res.voting) app.store.commit('status/startVoting')
      if (res.results) app.store.commit('status/startResults')
    })
    .catch((err) => {
      alert(err.message)
    })
}
