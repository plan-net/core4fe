<template>
  <c4-webapp :full-width="false">
    <side-navigation slot="navigation-slot"></side-navigation>
  </c4-webapp>
    <c4-webapp
    :full-width="true"

  >
    <portal to="c4ui-title-portal">
      <img v-if="dark" class="appbar-logo" src="~@/img/appbar/xo_logo_wt.svg" alt="">
      <img v-else  class="appbar-logo" src="~@/img/appbar/xo_logo_bl.svg" alt="">
    </portal>

  </c4-webapp>
</template>
<script>
import SideNavigation from '@/components/SideNavigation'

export default {
  name: 'data-table',
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
