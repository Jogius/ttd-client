<template>
  <v-app
    dark
    :style="{
      background: this.$vuetify.theme.themes[
        this.$vuetify.theme.dark ? 'dark' : 'light'
      ].background,
    }"
  >
    <v-app-bar fixed app color="primary" elevation="0" collapse-on-scroll>
      <v-btn icon to="/" router exact>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn
        v-if="$store.state.auth.token && $store.state.chatting"
        icon
        to="/chats"
        router
        exact
      >
        <v-badge :content="unreadMsg" :value="unreadMsg" color="info" overlap>
          <v-icon>mdi-chat</v-icon>
        </v-badge>
      </v-btn>
      <v-spacer />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-switch
        v-model="$vuetify.theme.dark"
        inset
        hide-details
        color="accent"
      />
    </v-app-bar>

    <v-main>
      <v-container fill-height>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app color="primary">
      <v-btn
        v-if="$store.state.auth.token && $store.state.chatting"
        icon
        to="/chats"
      >
        <v-badge :content="unreadMsg" :value="unreadMsg" color="info" overlap>
          <v-icon>mdi-chat</v-icon>
        </v-badge>
      </v-btn>
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-text-field
        v-if="$store.state.auth.token"
        v-model="$store.state.auth.token"
        outlined
        hide-details
        readonly
        dense
        prepend-inner-icon="mdi-numeric"
        append-icon="mdi-content-copy"
        @click:append="copy"
      />
      <span v-else>
        &copy; {{ new Date().getFullYear() }} - <strong>ttd</strong>
      </span>
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-btn icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      unreadMsg: 0,
      title: 'Turing Test Deutsch',
    }
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(this.$store.state.auth.token)
    },
  },
}
</script>
