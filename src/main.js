import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Core4ui from 'core4ui/core4'
import 'core4ui/core4/themes/core4/theme-c4.scss'
import THEME from 'core4ui/core4/themes/core4/theme-vuetify'
import { i18n } from 'core4ui/core4/translations'

import '@/filters.js'

Vue.use(Core4ui, {
  router,
  config: {
    THEME,
    TITLE: 'app---name',
    IGNORED_ERRORS: [],
    APP_IDENTIFIER: 'core'
  },
  store
})

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
