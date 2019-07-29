<template>
    <c4-page header-type="2" :dense="false">
        <v-container fluid slot="page-header-content">
            <v-layout justify-end class="white--text pt-2" row>
                <v-flex xs8>
                    <h3 class="display-1 mb-3">Welcome to the meeting app---name</h3>
                    <div class="title">Lorem ipsum dolor sit amet, per movet conceptam ad, duo ut elit impetus
                        splendide.
                    </div>
                </v-flex>
                <v-flex xs4 class="text-xs-right">
                    <v-btn small large color="primary" @click="createDialogOpen=true">
                        <v-icon class="mr-1" dark left>add</v-icon>
                        Add a client
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
        <transition name="fade" mode="out-in" :duration="{ enter: 200, leave: 300 }">
            <div>
                <v-container grid-list-xs fluid style="margin-top: -14px;">
                    <v-layout justify-center row wrap style="margin-left: -16px; margin-right: -16px;"
                              v-if="clients.length">
                        <v-flex xs6 sm4 md3 v-for="n in clients" :key="n._id" class="px-0 mx-3">
                            <v-card :to="`/clients/${n._id}/setup`" class="mx-1 my-2">
                                <v-img
                                        src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                                        aspect-ratio="2"
                                ></v-img>
                                <v-card-title primary-title>
                                    <h3 class="title text-truncate">{{n.name.toUpperCase()}}</h3>
                                </v-card-title>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <v-layout justify-center row wrap style="margin-left: -16px; margin-right: -16px;" v-else>
                        <v-flex>
                            <v-card>
                                <v-card-text>
                                    <c4-empty text="Please add a client."></c4-empty>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
        </transition>

        <create-client :open="createDialogOpen" @close="createDialogOpen=false"></create-client>

    </c4-page>
</template>
<script>
import { mapGetters } from 'vuex'
import CreateClient from '@/components/client/CreateClient'
// import { FETCH_CLIENTS } from '@/store/types'

export default {
  name: 'sa-clients',
  components: {
    CreateClient
  },
  mounted () {
    // this.$store.dispatch(FETCH_CLIENTS)
  },
  data () {
    return {
      createDialogOpen: false
    }
  },
  computed: {
    ...mapGetters(['clients'])
  },
  methods: {
  }
}
</script>
