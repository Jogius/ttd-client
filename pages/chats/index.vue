<template>
  <v-container fill-height class="pa-0">
    <v-row>
      <v-col cols="12" md="6" class="flex-grow-1 flex-shrink-0">
        <v-card flat class="d-flex flex-column" height="80vh" color="partner1">
          <v-card-title>Chat 1</v-card-title>
          <v-card-text ref="chat1" class="flex-grow-1 overflow-y-auto">
            <v-message
              v-for="(msg, i) in $store.state.chats.chat1.messages"
              :key="i"
              :message="msg"
            />
          </v-card-text>
          <v-card-text class="flex-shrink-1">
            <v-text-field
              v-model="input.message"
              outlined
              hide-details
              label="Nachricht"
              append-icon="mdi-send"
              color="info"
              :loading="loading.sending"
              :disabled="loading.sending"
              @click:append="sendChat1"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="flex-grow-1 flex-shrink-0">
        <v-card flat class="d-flex flex-column" height="80vh" color="partner2">
          <v-card-title>Chat 2</v-card-title>
          <v-card-text ref="chat2" class="flex-grow-1 overflow-y-auto">
            <v-message
              v-for="(msg, i) in $store.state.chats.chat2.messages"
              :key="i"
              :message="msg"
            />
          </v-card-text>
          <v-card-text class="flex-shrink-1">
            <v-text-field
              v-model="input.message"
              outlined
              hide-details
              label="Nachricht"
              append-icon="mdi-send"
              color="info"
              :loading="loading.sending"
              :disabled="loading.sending"
              @click:append="sendChat2"
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
      input: {
        message: '',
      },
      loading: {
        sending: false,
      },
    }
  },
  beforeMount() {
    if (!this.$store.state.status.chatting) this.$router.push('/')
  },
  methods: {
    sendChat1() {
      this.$refs.chat1.scrollTop = this.$refs.chat1.lastChild.offsetTop
    },
    sendChat2() {
      this.$refs.chat2.scrollTop = this.$refs.chat2.lastChild.offsetTop
    },
  },
}
// <v-container v-for="(msg, i) in messages" :key="i"> </v-container>
</script>
