<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-spacer />
      <v-spacer />
      <v-text-field
        v-model="input.username"
        counter
        outlined
        label="Benutzername"
        prepend-inner-icon="mdi-numeric"
        append-icon="mdi-send"
        color="info"
        maxlength="30"
        :loading="loading.create"
        :disabled="loading.create || loading.join"
        :rules="rules.create"
        @click:append="create"
      />
      <v-spacer />
      <v-spacer />
    </v-row>
    <v-row justify="center">
      <v-spacer />
      <v-spacer />
      <v-text-field
        v-model="input.code"
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
</template>

<script>
import config from 'assets/config'

export default {
  data() {
    return {
      input: {
        code: '',
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
  methods: {
    join() {
      // Validation
      let valid = true
      this.rules.join.forEach((rule) => {
        if (typeof rule(this.input.code) === 'string') valid = false
      })
      if (!valid) return

      this.loadingJoin = true
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
        .$post(`${config.SERVER_URL}/create`, { username: this.input.username })
        .then((res) => {
          this.$store.commit('setToken', res.token)
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
