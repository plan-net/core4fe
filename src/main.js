import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Core4ui from 'core4ui/core4'
import 'core4ui/core4/themes/core4/theme-c4.scss'
import THEME from 'core4ui/core4/themes/core4/theme-vuetify'

Vue.use(Core4ui, {
  App,
  router,
  store,
  config: {
    THEME,
    TITLE: 'core4fe'
  }
})
