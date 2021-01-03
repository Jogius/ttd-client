<template>
  <div class="d-flex" :class="{ 'flex-row-reverse': message.me }">
    <v-card
      class="message-container pa-4 mb-2 text-wrap"
      :color="message.me ? 'primary' : 'secondary'"
      elevation="6"
    >
      <span class="message-content">
        {{ message.content }}
      </span>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.message-container {
  border-radius: 15px;
  max-width: 60%;
}
.message-content {
  pointer-events: none;
}
</style>
