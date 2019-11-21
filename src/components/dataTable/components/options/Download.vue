<template>
  <v-dialog persistent v-model="dialog" max-width="500px">
    <v-card>

      <v-card-title>
        Stream the table content to a CSV file
      </v-card-title>

      <v-card-text>
        <v-switch
          v-model="reset"
          class="mx-2 mp-4"
          color="primary"
          label="Ignore the current column ordering and visibility"
        ></v-switch>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          small
          @click="download">
            Download
        </v-btn>
        <v-btn
          color="primary"
          text
          small
          @click="cancel">
            Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import apiService from '../../api/service'

export default {
  name: 'Download',
  props: {
    url: String,
    dialog: Boolean
  },
  data () {
    return {
      reset: false
    }
  },
  methods: {
    cancel () {
      this.beforeLeaveDialog()
    },
    download () {
      apiService.downloadTable(this.url,  this.reset)
      this.beforeLeaveDialog()
    },
    beforeLeaveDialog () {
      this.reset = false
      this.$emit('closeDialog')
    }
  }
}
</script>

<style scoped>
</style>
