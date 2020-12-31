<template>
  <v-container fluid fill-height>
    <v-flex>
      <v-container v-for="(msg, i) in messages" :key="i"> </v-container>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        {
          self: true,
          time: Date.now(),
          msg: 'Hello buddy',
        },
      ],
    }
  },
  beforeMount() {
    if (!this.$store.state.authToken) this.$router.push('/')
  },
}
</script>
