<template>
  <v-text-field
    dense
    v-model="text"
    class="px-2"
    append-outer-icon="send"
    prepend-inner-icon="search"
    label="Search"
    clearable
    filled
    @click:append-outer="send"
    @click:clear="clear"
  ></v-text-field>
</template>

<script>
  export default {
    name: "Search",
    props: {
      callback: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        text: ''
      }
    },
    methods: {
      send () {
        this.callback(this.text)
      },
      clear () {
        this.callback('')
      }
    }
  }
</script>

<style scoped>

</style>
