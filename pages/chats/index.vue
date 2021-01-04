<template>
  <v-container fill-height class="pa-0">
    <v-row>
      <v-col cols="12" md="6" class="flex-grow-1 flex-shrink-0">
        <v-card flat class="d-flex flex-column" height="80vh" color="partner1">
          <v-card-title>Chat 1</v-card-title>
          <v-card-text ref="chat1" class="flex-grow-1 overflow-y-auto">
            <v-message
              v-for="(msg, i) in $store.state.chat1.messages"
              :key="i"
              :message="msg"
            />
          </v-card-text>
          <v-card-text class="flex-shrink-1">
            <v-text-field
              v-model="chat1.input.message"
              outlined
              hide-details
              counter
              maxlength="160"
              label="Nachricht"
              append-icon="mdi-send"
              color="info"
              :loading="chat1.loading.sending"
              :disabled="chat1.loading.sending"
              @click:append="sendChat1"
              @keydown.enter="sendChat1"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="flex-grow-1 flex-shrink-0">
        <v-card flat class="d-flex flex-column" height="80vh" color="partner2">
          <v-card-title>Chat 2</v-card-title>
          <v-card-text ref="chat2" class="flex-grow-1 overflow-y-auto">
            <v-message
              v-for="(msg, i) in $store.state.chat2.messages"
              :key="i"
              :message="msg"
            />
          </v-card-text>
          <v-card-text class="flex-shrink-1">
            <v-text-field
              v-model="chat2.input.message"
              outlined
              hide-details
              counter
              maxlength="160"
              label="Nachricht"
              append-icon="mdi-send"
              color="info"
              :loading="chat2.loading.sending"
              :disabled="chat2.loading.sending"
              @click:append="sendChat2"
              @keydown.enter="sendChat2"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import vMessage from '~/components/v-message.vue'

export default {
  components: { vMessage },
  data() {
    return {
      chat1: {
        input: {
          message: '',
        },
        loading: {
          sending: false,
        },
      },
      chat2: {
        input: {
          message: '',
        },
        loading: {
          sending: false,
        },
      },
      rules: {
        message: [(value) => !!value],
      },
    }
  },
  beforeCreate() {
    if (!this.$store.state.status.chatting || !this.$store.auth.userToken)
      this.$router.push('/')
  },
  mounted() {
    this.$refs.chat1.scroll({
      top: this.$refs.chat1.scrollHeight,
      behavior: 'instant',
    })
    this.$refs.chat2.scroll({
      top: this.$refs.chat2.scrollHeight,
      behavior: 'instant',
    })
    this.$store.watch(
      (state) => {
        return state.chat1.messages
      },
      () => {
        if (this.$refs.chat1 && this.$refs.chat1.scroll) {
          this.$refs.chat1.scroll({
            top: this.$refs.chat1.scrollHeight,
            behavior: 'instant',
          })
        }
      }
    )
    this.$store.watch(
      (state) => {
        return state.chat2.messages
      },
      () => {
        if (this.$refs.chat2 && this.$refs.chat2.scroll) {
          this.$refs.chat2.scroll({
            top: this.$refs.chat2.scrollHeight,
            behavior: 'instant',
          })
        }
      }
    )
  },
  methods: {
    sendChat1() {
      if (!this.chat1.input.message) return

      this.$socket.emit('chat1/message', {
        message: this.chat1.input.message,
        userToken: this.$store.state.auth.userToken,
      })
      this.$store.commit('chat1/sendMessage', this.chat1.input.message)
      this.chat1.input.message = ''
    },
    sendChat2() {
      if (!this.chat2.input.message) return

      this.$socket.emit('chat2/message', {
        message: this.chat2.input.message,
        userToken: this.$store.state.auth.userToken,
      })
      this.$store.commit('chat2/sendMessage', this.chat2.input.message)
      this.chat2.input.message = ''
    },
  },
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #666;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:active {
  background-color: #777;
}
</style>
