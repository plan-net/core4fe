<template>
  <div>
    <!-- //CRUD -->
    <v-slide-y-transition
      group
      dense class="boards"
      tag="v-list"
    >
      <!-- //LIST OF CLIENTS -->
      <template>
        <v-list-tile to="/" key="-1001">
          <v-list-tile-content>
            <v-list-tile-title>
              Clients
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>

    </v-slide-y-transition>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['client'])
  }
}
</script>
<style scoped lang="css">
  div >>> .v-list__tile .v-list__tile__content {
    font-weight: 600;
  }
</style>
