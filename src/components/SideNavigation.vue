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
        <v-list-item to="/" key="-1001">
          <v-list-item-content>
            <v-list-item-title>
              Clients
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
