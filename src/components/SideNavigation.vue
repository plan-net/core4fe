<template>
  <div>
    <v-slide-y-transition
      group
      dense
      tag="v-list"
    >
      <template>
        <v-list-item
          to="/"
          key="-1001"
        >
          <v-list-item-content>
            <v-list-item-title>
              Home
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

    </v-slide-y-transition>
  </div>
</template>
<script>

export default {

}
</script>
<style scoped lang="css">
div >>> .v-list__tile .v-list__tile__content {
  font-weight: 600;
}
</style>
