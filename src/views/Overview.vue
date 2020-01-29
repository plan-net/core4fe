<template>
    <c4-page header-type="2" :dense="false">
        <v-container slot="page-header-content">
            <v-layout justify-end class="white--text pt-2" row>
                <v-flex xs8>
                    <h3 class="display-1 mb-3">Welcome to the meeting app---name</h3>
                    <div class="title">Lorem ipsum dolor sit amet, per movet conceptam ad, duo ut elit impetus
                        splendide.
                    </div>
                </v-flex>
                <v-flex xs4>
                </v-flex>
            </v-layout>
        </v-container>
            <v-container>
                <v-card
                    class="mx-auto"
                    outlined
                >
                    <v-card-title>
                        <div>Hello World</div>
                    </v-card-title>
                    <v-card-text>
                        <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
                        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                    </v-card-text>

                    <v-card-actions>
                    </v-card-actions>
                </v-card>
            </v-container>
    </c4-page>
</template>
<script>

export default {
  name: 'overview',
  components: {},
  mounted () {
    console.log(process.env.VUE_APP_APIBASE_APP)
  },
  data () {
    return {
      createDialogOpen: false
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
