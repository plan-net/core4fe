<template>
  <v-toolbar dense
             flat
             :extended="extended"
             :extension-height="extensionHeight">

    <!-- Search -->
    <template v-if="searchActive">
      <search :searchActive="searchActive" @closeInput="onSearch"></search>
    </template>
    <template v-else>
      <v-toolbar-title v-if="title">{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Search input activator btn-->
      <v-btn small icon @click="searchActive = true">
        <v-icon>search</v-icon>
      </v-btn>
    </template>

    <v-divider class="mx-4" vertical></v-divider>

    <!-- Advanced-options -->
    <v-btn small icon v-if="advanced" @click="onAdvanced(false)">
      <v-icon small>sort</v-icon>
      <advanced-options v-if="advancedActive"
                        :dialog="advancedActive"
                        :translation="translation"
                        :column="column"
                        @closeDialog="onAdvanced">
      </advanced-options>
    </v-btn>

    <!-- Download -->
    <v-btn small icon @click="onDownload">
      <v-icon small>cloud_download</v-icon>
      <download v-if="downloadActive"
                :url="url"
                :dialog="downloadActive"
                @closeDialog="downloadActive = !downloadActive">
      </download>
    </v-btn>

    <!-- Dense -->
    <v-btn small icon @click="onDense">
      <v-icon small v-show="dense">format_line_spacing</v-icon>
      <v-icon small v-show="!dense">format_align_justify</v-icon>
    </v-btn>

    <!-- Fullscreen -->
    <v-btn small icon @click="onResize">
      <v-icon small v-show="fullscreen">fullscreen_exit</v-icon>
      <v-icon small v-show="!fullscreen">fullscreen</v-icon>
    </v-btn>

  </v-toolbar>
</template>

<script>
import Search from './Search'
import Download from './Download'
import AdvancedOptions from './AdvancedOptions'

export default {
  name: 'Toolbar',
  components: {
    Search,
    Download,
    AdvancedOptions
  },
  props: {
    title: String,
    url: String,
    fullscreen: Boolean,
    dense: Boolean,
    advanced: Boolean,
    translation: Object,
    column: Array
  },
  data () {
    return {
      resizeIcon: false,
      extended: false,
      extensionHeight: 48,

      searchActive: false,
      downloadActive: false,
      advancedActive: false
    }
  },
  methods: {
    onSearch (data) {
      let { type, text = '' } = data

      this.$emit('search', { filter: text })
      if (type === 'esc' || type === 'clear') this.searchActive = false
    },
    onResize () {
      this.$emit('resize')
      this.resizeIcon = !this.resizeIcon
    },
    onDense () {
      this.$emit('dense')
    },
    onDownload () {
      this.downloadActive = !this.downloadActive
    },
    onAdvanced (data) {
      if (data) this.$emit('sort', data)
      this.advancedActive = !this.advancedActive
    },
    search () {
      this.searchActive = false
    },
    clear () {
      console.log('clear')
    }
  }
}
</script>

<style scoped>
</style>
