<template>
  <component :is="selectedComponent">
    <toolbar></toolbar>
    <v-divider></v-divider>
    <v-data-table
      v-resize:debounce="onResize"
      :class="config.className"
      :height="internalHeight"
      :headers="headers"
      :items="rows"
      :options.sync="options"
      :fixed-header="options.option.fixed_header"
      :hide-default-header="options.option.hide_header"
      :hide-default-footer="false"
      :multi-sort="true"
      :dense="options.option.dense"
      item-key="id"
      :items-per-page="options.itemsPerPage"
      :server-items-length="options.paging.total_count"
      :loading="loading"
      :loading-text="translation.data_loading"
      :footer-props="footerProps"
      @click:row="$emit('click-row', $event)"
    >
      <template v-slot:top>
        <v-container fluid>
          <v-row no-gutters>
            <v-col
              cols="auto"
              lg="3"
            >
              <search :callback="search"></search>
            </v-col>

            <v-spacer></v-spacer>

            <v-col cols="auto">
              <download
                class="mx-4"
                :callback="download"
              ></download>
            </v-col>
            <v-col cols="auto">
              <advanced-options
                v-if="options.option.advanced_options && advancedOptions"
                :options="advancedOptions"
                xxoptions="{column: column, dense: options.option.dense, fullscreen: options.option.fullscreen}"
                :translation="translation"
                :loading="loading"
                @reset-options="resetOptions()"
                @save-options="saveOptions($event)"
              >

              </advanced-options>
              <v-btn
                small
                outlined
                class="mb-2"
                :disabled="loading"
                @click="openAdvancedOptions"
              >
                <v-icon
                  class="mr-2"
                  x-small
                >table_chart</v-icon>{{translation.advanced_options}}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-data-table>
  </component>
</template>

<script>
import debounce from 'debounce'
import { clone } from 'core4ui/core4/helper.js'

import AdvancedOptions from './components/AdvancedOptions'
import Download from './components/Download'
import Search from './components/Search'
import RegularWrapper from './components/RegularWrapper'
import FullscreenWrapper from './components/FullscreenWrapper'

import apiService from './api/service'
import resize from './helper/resize.js'
import { checkShadow } from './helper/resize-functions.js'
import { initialTranslation, OPTIONS } from './helper/obj.js'
import Toolbar from './components/Toolbar'

export default {
  name: 'data-table',
  components: {
    RegularWrapper,
    FullscreenWrapper,
    AdvancedOptions,
    Download,
    Search,

    Toolbar
  },
  directives: {
    resize
  },
  props: {
    config: {
      type: Object,
      required: true
    },
    labels: {
      type: Object,
      default: () => {
      }
    }
  },
  data: () => ({
    selectedComponent: 'RegularWrapper',
    advancedOptions: null,
    startWatch: false,
    loading: false,

    // config related to vuetify datatable
    options: Object.assign({}, OPTIONS),
    rows: [],
    column: []
  }),
  mounted () {
    this.getTableFromApi = debounce(this.getTableFromApi, 500)
    this.getTableFromApi()

    // trigger update after payload change
    this.$bus.$on('update-datatable', this.getTableFromApi)
  },
  watch: {
    options: {
      handler (newVal, oldVal) {
        if (this.startWatch) this.getTableFromApi()
      },
      deep: true
    }
  },
  computed: {
    footerProps () {
      const { itemsPerPageAllText, itemsPerPageText } = this.translation

      return Object.assign(
        { showFirstLastPage: true },
        { itemsPerPageAllText, itemsPerPageText }
      )
    },
    translation () {
      return Object.assign({}, initialTranslation, this.labels)
    },
    headers () {
      return this.column.filter(item => !item.hide)
    },
    internalHeight () {
      return this.options.fixed_header === true ? (this.options.height || 555) : null
    }
  },
  methods: {
    openAdvancedOptions () {
      this.advancedOptions = this.$helper.clone(
        { column: this.column, dense: this.options.option.dense, fullscreen: this.options.option.fullscreen }
      )
    },
    search (text) {
      apiService.searchTable(this.config.url, text)
        .then(data => {
          this.startWatch = false

          Object.assign(this.options, {
            action: data.action,
            itemsPerPage: data.itemsPerPage,
            option: data.option,
            page: data.page,
            paging: data.paging,
            sort: data.sort,
            sortBy: data.sortBy,
            sortDesc: data.sortDesc
          })

          this.column = data.column
          this.rows = data.body

          this.$nextTick(() => {
            this.startWatch = true
          })
        })
        .catch(data => {
          // ToDo: error handling
        })
        .finally(() => {
          this.loading = false
        })
    },
    download (reset) {
      apiService.downloadTable(this.config.url, reset)
    },
    onResize () {
      checkShadow(this.$el)
    },
    saveOptions (data) {
      debugger
      this.selectedComponent = data.fullscreen ? 'FullscreenWrapper' : 'RegularWrapper'
      this.options.option.fullscreen = data.fullscreen
      this.getTableFromApi({ column: data.column, dense: data.dense })
    },
    resetOptions () {
      this.getTableFromApi({ reset: true })
    },
    getTableFromApi (params) {
      this.loading = true

      return apiService.getTable(this.config.url, Object.assign(clone(this.options), params), this.config.payload)
        .then(data => {
          this.startWatch = false

          Object.assign(this.options, {
            action: data.action,
            itemsPerPage: data.itemsPerPage,
            option: Object.assign(data.option, { fullscreen: this.options.option.fullscreen }),
            page: data.page,
            paging: data.paging,
            sort: data.sort,
            sortBy: data.sortBy,
            sortDesc: data.sortDesc
          })

          this.column = data.column
          this.rows = data.body

          this.$nextTick(() => {
            this.startWatch = true
          })
        })
        .catch(data => {
          // ToDo: error handling
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onWindowResize)
  }
}
</script>

<style scoped lang="css">
div >>> tbody tr td {
  cursor: pointer;
}
</style>
<style scoped lang="scss">
.shadowed {
  position: relative;
  &:after {
    content: "";
    display: block;
    right: 0;
    width: 70px;
    top: 0;
    bottom: 0;
    background: rgb(150, 150, 150);
    background: linear-gradient(
      90deg,
      rgba(150, 150, 150, 0) 50%,
      rgba(0, 0, 0, 0.87) 100%
    );
    position: absolute;
    z-index: 2000;
  }
}
</style>
