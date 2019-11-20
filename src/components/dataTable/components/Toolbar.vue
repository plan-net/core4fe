<template>
  <v-toolbar
    :extended="extended"
    dense
    flat
    :extension-height="extensionHeight"
  >
    <template v-if="searchActive">
      <v-text-field
        ref="searchRef"
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
        @click:clear="clear"
      ></v-text-field>
    </template>
    <template v-else>

      <v-toolbar-title>Optional Datatable Title</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
        @click="searchActive = true"
        small
        icon
      >
        <v-icon>search</v-icon>
      </v-btn>
    </template>

    <v-divider
      class="mx-4"
      vertical
    ></v-divider>
    <v-btn
      @click="extended = !extended"
      small
      icon
    >
      <v-icon small>sort</v-icon>
    </v-btn>
    <v-btn
      small
      icon
    >
      <v-icon small>cloud_download</v-icon>
    </v-btn>
    <v-btn
      small
      icon
    >
      <v-icon small>format_line_spacing</v-icon>
    </v-btn>
    <v-btn
      small
      icon
    >
      <v-icon small>fullscreen</v-icon>
    </v-btn>
<!--     <template v-if="extended" #extension>
      <v-toolbar-items>
        <v-btn text>Link 1</v-btn>
        <v-btn text>Link 2</v-btn>
        <v-btn text>Link 3</v-btn>
      </v-toolbar-items>
    </template> -->
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      extended: false,
      extensionHeight: 48,

      searchActive: false
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
    search () {
      console.log('search')
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
