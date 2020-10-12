<template>
  <c4-webapp :full-width="false">
    <side-navigation slot="navigation-slot"></side-navigation>
  </c4-webapp>
</template>
<script>
import SideNavigation from '@/components/SideNavigation'

export default {
  name: 'app---name',
  components: {
    SideNavigation
  },
  computed: {},
  mounted () {
  }
}
</script>
<style lang="scss">
</style>
