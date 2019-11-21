<template>
  <v-toolbar dense
             flat
             :extended="extended"
             :extension-height="extensionHeight">
    <template v-if="searchActive">
      <!-- Search -->
      <v-text-field ref="searchRef"
                    class="search"
                    hide-details
                    filled
                    dense
                    single-line
                    clearable
                    prepend-inner-icon="search"
                    append-icon="send"
                    v-on:keyup.enter="search"
                    v-on:keyup.esc="searchActive = false"
                    @click:append="search"
                    @click:clear="clear">
      </v-text-field>
    </template>

    <template v-else>
      <v-toolbar-title>Optional Datatable Title</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Search activator btn-->
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
  import { clone } from 'core4ui/core4/helper.js'

  import Download from './Download'
  import AdvancedOptions from "./AdvancedOptions"

  export default {
    name: 'Toolbar',
    components: {
      Download,
      AdvancedOptions
    },
    props: {
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
    watch: {
      searchActive (newVal) {
        if (newVal) {
          this.$nextTick(function () {
            this.$refs.searchRef.focus()
          })
        }
      }
    },
    methods: {
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

<style lang="scss" scoped>
  .search.v-text-field.v-input--dense {
    margin-left: -16px !important;
    margin-right: -16px !important;
    height: 48px;
    ::v-deep .v-input__slot {
      height: 48px;
    }
  }

  ::v-deep
  .search.v-text-field.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo).v-text-field--single-line
  .v-input__prepend-inner,
  ::v-deep
  .search.v-text-field.v-text-field--enclosed.v-input--dense:not(.v-text-field--solo)
  .v-input__append-inner {
    margin-top: 14px;
  }

  ::v-deep
  .search.v-text-field--filled.v-text-field--single-line.v-input--dense
  input {
    margin-top: 12px;
  }
</style>
