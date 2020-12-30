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
      <v-btn v-if="joined" icon to="/chats" router exact>
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
      <v-btn v-if="joined" icon to="/chats">
        <v-badge :content="unreadMsg" :value="unreadMsg" color="info" overlap>
          <v-icon>mdi-chat</v-icon>
        </v-badge>
      </v-btn>
      <v-spacer />
      <span>
        &copy; {{ new Date().getFullYear() }} - <strong>ttd</strong>
      </span>
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
      joined: false,
      unreadMsg: 0,
      title: 'Turing Test Deutsch',
    }
  },
}
</script>
