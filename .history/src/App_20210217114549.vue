<template>
  <c4-webapp :full-width="true">
    <side-navigation slot="navigation-slot"></side-navigation>
    <portal to="c4ui-title-portal">
      <img
        class="appbar-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Wikipedia_wordmark.svg/2880px-Wikipedia_wordmark.svg.png"
        alt=""
      >
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
