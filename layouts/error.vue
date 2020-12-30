<template>
  <v-flex class="text-center">
    <h1 v-text="error.statusCode === 404 ? pageNotFound : otherError" />
    <v-btn x-large icon to="/"><v-icon x-large>mdi-home</v-icon></v-btn>
  </v-flex>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'Error 404: Seite nicht gefunden',
      otherError: 'Ein Fehler ist aufgetreten',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>
