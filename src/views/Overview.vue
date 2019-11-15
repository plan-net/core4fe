<template>
    <c4-page header-type="2" :dense="false">
        <v-container fluid slot="page-header-content">
            <v-layout justify-end class="white--text pt-2" row>
                <v-flex xs8>
                    <h3 class="display-1 mb-3">Welcome to the data table component</h3>
                </v-flex>
            </v-layout>
        </v-container>

        <div class="ma-8">
          <data-table
            :config="{url: url, payload: payload}"
            :labels="{}">
          </data-table>
        </div>

    </c4-page>
</template>
<script>
import { mapGetters } from 'vuex'
import DataTable from '@/components/dataTable/DataTable.vue'
// import { FETCH_CLIENTS } from '@/store/types'

export default {
  name: 'sa-clients',
  components: {
    DataTable
  },
  mounted () {
    // this.$store.dispatch(FETCH_CLIENTS)
    console.log(process.env.VUE_APP_APIBASE_APP)
  },
  data () {
    return {
      createDialogOpen: false,
      url: '/table',
      payload: {}
    }
  },
  computed: {
    ...mapGetters(['clients'])
  },
  methods: {
  }
}
</script>
