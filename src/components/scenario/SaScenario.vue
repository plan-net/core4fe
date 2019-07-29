<template>
    <c4-page class="sa-stepper-base"
             header-type="2"
             medium>
        <v-container slot="page-header-content">
            <h3 style="margin-top: -12px;" class="headline mb-3 white--text">{{client.name}}</h3>
        </v-container>
        <v-container class="sa-card-container">
            <c4-card headline="Scenario">
                <div slot="primary-controls">
                    <v-layout align-center justify-center row fill-height>
                        <sa-saving-indicator></sa-saving-indicator>
                    </v-layout>
                </div>
                <v-form v-model="valid">
                    <v-container fluid class="pa-0">

                    </v-container>
                </v-form>
            </c4-card>
        </v-container>
    </c4-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'sa-scenario',
  async beforeRouteEnter (to, from, next) {
    return next()
  },
  components: {},
  props: {},
  data () {
    return {
      valid: false
    }
  },
  methods: {},
  computed: {
    ...mapGetters(['client', 'models'])
  }
}
</script>
<style scoped lang="css">

</style>
<style scoped lang="scss">

</style>
