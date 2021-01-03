<template>
  <v-container
    v-if="!$store.state.auth.adminHasAuthenticated"
    fill-height
    class="pa-0"
  >
    <v-row justify="center">
      <v-spacer />
      <v-spacer />
      <v-text-field
        v-model="input.password"
        counter
        outlined
        label="Password"
        type="password"
        append-icon="mdi-send"
        color="info"
        :loading="loading.login"
        :disabled="loading.login"
        :rules="rules.password"
        @click:append="login"
        @keydown.enter="login"
      />
      <v-spacer />
      <v-spacer />
    </v-row>
  </v-container>
  <v-container v-else fill-height class="pa-0">
    <v-row justify="center">
      <v-card color="primary">
        <v-card-title>Status</v-card-title>
        <v-card-actions>
          <v-btn @click.stop="startButton">
            {{ $store.state.status.started ? 'Stop' : 'Start' }}
          </v-btn>
          <v-btn @click.stop="chatButton">
            {{
              $store.state.status.chatting ? 'Chats schließen' : 'Chats öffnen'
            }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { io } from 'socket.io-client'
import config from '~/assets/config'

export default {
  data() {
    return {
      input: {
        password: '',
      },
      loading: {
        login: false,
      },
      rules: {
        password: [(value) => !!value || 'Bitte gib einen Benutzernamen ein'],
      },
      socket: this.$store.state.auth.adminHasAuthenticated
        ? io(`${config.SERVER_URL}/admin`)
        : undefined,
    }
  },
  methods: {
    login() {
      if (this.input.password === '/*69IAMGROOT420*\\') {
        this.$store.commit('auth/setAdmin')
        this.socket = io(`${config.SERVER_URL}/admin`)
      }
    },
    startButton() {
      if (this.$store.state.status.started) {
        this.$axios
          .$post(`${config.SERVER_URL}/status/stop`)
          .then((res) => {
            this.$store.commit('status/stop')
          })
          .catch((err) => {
            alert(err.message)
          })
      } else {
        this.$axios
          .$post(`${config.SERVER_URL}/status/start`)
          .then((res) => {
            this.$store.commit('status/start')
          })
          .catch((err) => {
            alert(err.message)
          })
      }
    },
    chatButton() {
      if (this.$store.state.status.chatting) {
        this.$axios
          .$post(`${config.SERVER_URL}/status/chat/stop`)
          .then((res) => {
            this.$store.commit('status/stopChatting')
          })
          .catch((err) => {
            alert(err.message)
          })
      } else {
        this.$axios
          .$post(`${config.SERVER_URL}/status/chat/stop`)
          .then((res) => {
            this.$store.commit('status/startChatting')
          })
          .catch((err) => {
            alert(err.message)
          })
      }
    },
  },
}
</script>
