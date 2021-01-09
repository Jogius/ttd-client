<template>
  <v-container v-if="$store.state.status.voted" fill-height class="pa-0">
    <v-row justify="center">
      <h1 v-if="$store.state.results.votedCorrect">Richtig!</h1>
      <h1 v-else>Leider falsch...</h1>
    </v-row>
    <v-row justify="center">
      <h3 v-if="$store.state.results.doubleBot">
        Allerdings waren bei dir auch beide Chatpartner Bots ;)
      </h3>
      <h3 v-else>Dein Chatpartner war {{ $store.state.results.username }}</h3>
    </v-row>
    <v-row justify="center">
      <v-col cols="4" class="flex-grow-1 flex-shrink-0">
        <v-card flat class="d-flex flex-column" height="40vh" color="partner1">
          <v-card-title>Chat 1</v-card-title>
          <v-card-text ref="chat1" class="flex-grow-1 overflow-y-auto">
            <v-message
              v-for="(msg, i) in $store.state.chat1.messages"
              :key="i"
              :message="msg"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4" class="flex-grow-1 flex-shrink-0">
        <v-card flat class="d-flex flex-column" height="40vh" color="partner2">
          <v-card-title>Chat 2</v-card-title>
          <v-card-text ref="chat2" class="flex-grow-1 overflow-y-auto">
            <v-message
              v-for="(msg, i) in $store.state.chat2.messages"
              :key="i"
              :message="msg"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else fill-height class="pa-0">
    <v-row justify="center">
      <h1>Wer ist der Bot?</h1>
    </v-row>
    <v-row justify="center">
      <v-col cols="4" class="flex-grow-1 flex-shrink-0">
        <v-card flat class="d-flex flex-column" height="40vh" color="partner1">
          <v-card-title>Chat 1</v-card-title>
          <v-card-text ref="chat1" class="flex-grow-1 overflow-y-auto">
            <v-message
              v-for="(msg, i) in $store.state.chat1.messages"
              :key="i"
              :message="msg"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              icon
              x-large
              :disabled="$store.state.status.voted"
              @click.stop="vote1"
            >
              <v-icon x-large color="partner2">mdi-numeric-1-box</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4" class="flex-grow-1 flex-shrink-0">
        <v-card flat class="d-flex flex-column" height="40vh" color="partner2">
          <v-card-title>Chat 2</v-card-title>
          <v-card-text ref="chat2" class="flex-grow-1 overflow-y-auto">
            <v-message
              v-for="(msg, i) in $store.state.chat2.messages"
              :key="i"
              :message="msg"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
              icon
              x-large
              :disabled="$store.state.status.voted"
              @click.stop="vote2"
            >
              <v-icon x-large color="partner1">mdi-numeric-2-box</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  beforeCreate() {
    if (!this.$store.state.status.voting || !this.$store.state.auth.userToken)
      this.$router.push('/')
  },
  methods: {
    vote1() {
      this.$store.commit('status/setVoted', true)
      this.$socket.emit(
        'vote/1',
        this.$store.state.auth.userToken,
        (correct, doubleBot, username) => {
          this.$store.commit('results/setVotedCorrect', correct)
          if (doubleBot) {
            this.$store.commit('results/setDoubleBot')
          } else {
            this.$store.commit('results/setUsername', username)
          }
        }
      )
    },
    vote2() {
      this.$store.commit('status/setVoted', true)
      this.$socket.emit(
        'vote/2',
        this.$store.state.auth.userToken,
        ({ correct, doubleBot, username }) => {
          this.$store.commit('results/setVotedCorrect', correct)
          if (doubleBot) {
            this.$store.commit('results/setDoubleBot')
          } else {
            this.$store.commit('results/setUsername', username)
          }
        }
      )
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
