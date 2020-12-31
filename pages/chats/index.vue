<template>
  <v-container fluid fill-height class="pa-0">
    <v-row no-gutters>
      <v-container v-for="(msg, i) in messages" :key="i"> </v-container>
    </v-row>
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
    if (!this.$store.state.chatting) this.$router.push('/')
  },
}
</script>
