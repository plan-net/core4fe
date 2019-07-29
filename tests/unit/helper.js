import { mount } from '@vue/test-utils'
import Vuex from 'vuex'
import Router from 'vue-router'
import vuetify from 'vuetify'
import router, { routes } from '@/router'
import { mockRouterComponents } from 'vue-test-utils-helpers'
import Core4ui from 'core4ui/core4'
import THEME from 'core4ui/core4/themes/core4/theme-vuetify'
import SaSavingIndicator from '@/components/sa-base/SaSavingIndicator.vue'

function mock () {
  // stub out the components that the routes point to
  // as we don't want to load and render real components
  const clearedRoutes = mockRouterComponents(routes)
  return new Router({
    mode: 'abstract',
    routes: clearedRoutes
  })
}

function addElemWithDataAppToBody () {
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.append(app)
}

export function build (iVue, Component, options, storeParts) {
  addElemWithDataAppToBody()
  function getStore (getters, actions) {
    return new Vuex.Store({
      getters, actions
    })
  }

  options.sync = options.sync || false
  options.attachToDocument = options.attachToDocument || true
  options.router = options.router || router

  const { getters, actions } = storeParts
  const store = getStore(getters, actions)

  window.Vue = iVue
  iVue.use(vuetify)
  iVue.use(Vuex)
  iVue.use(Router)
  iVue.component('sa-saving-indicator', SaSavingIndicator)
  iVue.use(Core4ui, {
    router: options.router,
    config: {
      THEME,
      TITLE: 'APP',
      APP_IDENTIFIER: 'app'
    },
    store
  })

  return {
    wrapper: mount(Component, Object.assign(options, { store }))
  }
}
