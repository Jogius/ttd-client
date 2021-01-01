<template>
  <v-container v-if="!$store.state.auth.token" fill-height>
    <v-row justify="center">
      <v-spacer />
      <v-spacer />
      <v-text-field
        v-if="!$store.state.status.started"
        v-model="input.username"
        counter
        outlined
        label="Benutzername"
        append-icon="mdi-send"
        color="info"
        maxlength="30"
        :loading="loading.create"
        :disabled="loading.create || loading.join"
        :rules="rules.create"
        @click:append="create"
      />
      <h1 v-else>Der Test wurde bereits gestartet</h1>
      <v-spacer />
      <v-spacer />
    </v-row>
    <v-row justify="center">
      <v-spacer />
      <v-spacer />
      <v-text-field
        v-model="input.token"
        counter
        outlined
        persistent-hint
        label="Wiederbeitritts Code"
        hint="Du bist ausversehen rausgegangen? Trete hier erneut bei"
        prepend-inner-icon="mdi-numeric"
        append-icon="mdi-send"
        color="info"
        maxlength="36"
        :loading="loading.join"
        :disabled="loading.join || loading.create"
        :rules="rules.join"
        @click:append="join"
      />
      <v-spacer />
      <v-spacer />
    </v-row>
  </v-container>
  <v-container v-else-if="$store.state.status.voting" fill-height>
    <v-row justify="center">
      <v-spacer />
      <v-spacer />
      <h1>Wer ist der Bot?</h1>
      <v-spacer />
      <v-spacer />
    </v-row>
    <v-row justify="center">
      <v-spacer />
      <v-spacer />
      <v-btn icon x-large>
        <v-icon x-large color="partner1">mdi-numeric-1-box</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn icon x-large>
        <v-icon x-large color="partner2">mdi-numeric-2-box</v-icon>
      </v-btn>
      <v-spacer />
      <v-spacer />
    </v-row>
  </v-container>
  <v-container v-else-if="!$store.state.status.chatting" fluid>
    <v-row justify="center">
      <h1>Bitte warte, bis die Chats freigegeben werden!</h1>
    </v-row>
    <v-row justify="center">
      <v-subheader>
        In der Zeit kannst du deinen Code (siehe Fußzeile) kopieren!
      </v-subheader>
    </v-row>
  </v-container>
</template>

<script>
import config from '~/assets/config'

export default {
  data() {
    return {
      input: {
        token: '',
        username: '',
      },
      loading: {
        join: false,
        create: false,
      },
      rules: {
        join: [
          (value) => !!value || 'Bitte gib deinen Code ein',
          (value) =>
            (value && value.length === 36) || 'Dein Code ist 36 Zeichen lang',
          (value) => RegExp('^[a-f0-9-_]*$').test(value) || 'Falscher Code',
        ],
        create: [
          (value) => !!value || 'Bitte gib einen Benutzernamen ein',
          (value) =>
            (value && value.length >= 3 && value.length <= 30) ||
            'Der Benutzername muss zwischen 3 und 30 Zeichen lang sein',
          (value) =>
            RegExp('^[a-zA-Z0-9-_]*$').test(value) ||
            'Erlaubte Zeichen: a-z A-Z 0-9 _ -',
        ],
      },
    }
  },
  beforeMount() {
    if (this.$store.state.status.chatting) this.$router.push('/chats')
  },
  methods: {
    join() {
      // Validation
      let valid = true
      this.rules.join.forEach((rule) => {
        if (typeof rule(this.input.token) === 'string') valid = false
      })
      if (!valid) return

      this.loadingJoin = true
      this.$axios
        .$post(`${config.SERVER_URL}/auth/join`, { token: this.input.token })
        .then((res) => {
          this.$store.commit('auth/setToken', res.token)
          this.$store.commit('authsetUsername', res.username)
          this.loadingJoin = false
        })
        .catch((err) => {
          alert(err)
          this.loadingJoin = false
        })
    },
    create() {
      // Validation
      let valid = true
      this.rules.create.forEach((rule) => {
        if (typeof rule(this.input.username) === 'string') valid = false
      })
      if (!valid) return

      this.loadingCreate = true
      this.$axios
        .$post(`${config.SERVER_URL}/auth/create`, {
          username: this.input.username,
        })
        .then((res) => {
          this.$store.commit('auth/setToken', res.token)
          this.$store.commit('auth/setUsername', res.username)
          this.loadingCreate = false
        })
        .catch((err) => {
          alert(err)
          this.loadingCreate = false
        })
    },
  },
}
</script>
