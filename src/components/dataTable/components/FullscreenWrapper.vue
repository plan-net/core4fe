<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <!--    <template v-slot:activator="{ on }"></template>-->
    <!--    <slot></slot>-->
    <v-card>
      <v-toolbar
        dark
        color="primary"
      >
        <v-btn
          icon
          dark
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Fullscreen mode</v-toolbar-title>
        <v-spacer></v-spacer>
        <!--        <v-toolbar-items>-->
        <!--          <v-btn dark text @click="dialog = false">Cancel</v-btn>-->
        <!--        </v-toolbar-items>-->
      </v-toolbar>
      <slot></slot>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'FullscreenWrappper',
  data () {
    return {
      dialog: true
    }
  }
}
</script>

<style scoped>
</style>
