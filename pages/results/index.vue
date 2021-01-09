<template>
  <v-container fill-height class="pa-0">
    <v-row justify="center">
      <v-spacer />
      <v-spacer />
      <h1>Die Ergebnisse:</h1>
      <v-spacer />
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
export default {
  beforeCreate() {
    if (!this.$store.state.status.results || !this.$store.state.auth.userToken)
      this.$router.push('/')
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
