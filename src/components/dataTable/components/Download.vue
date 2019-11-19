<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        small
        v-on="on"
      >
        <v-icon
          class="mr-2"
          small
        >cloud_download</v-icon>Download
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Stream the table content to a CSV file
      </v-card-title>
      <v-card-text>
        <v-switch
          v-model="reset"
          class="mx-2 mp-4"
          color="primary"
          label="Ignore the current column ordering and
    visibility"
        ></v-switch>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          small
          @click="download"
        >
          Download
        </v-btn>
        <v-btn
          color="primary"
          text
          small
          @click="cancel"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Search',
  mounted () {},
  data () {
    return {
      dialog: false,
      reset: false
    }
  },
  props: {
    callback: {
      type: Function,
      required: true
    }
  },
  methods: {
    cancel () {
      this.dialog = !this.dialog
      this.reset = false
    },
    download () {
      this.dialog = !this.dialog
      this.callback(this.reset)
      this.reset = false
    }
  }
}
</script>

<style scoped>
</style>
