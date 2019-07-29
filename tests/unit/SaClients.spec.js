import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import SaClients from '@/components/sa-clients/SaClients.vue'
import Router from 'vue-router'
import { FETCH_CLIENTS } from '@/store/types'
import Core4ui from 'core4ui/core4'
import THEME from 'core4ui/core4/themes/core4/theme-vuetify'
import router from '@/router'
function getStore (getters, actions) {
  return new Vuex.Store({
    getters, actions
  })
}
describe('SaClients.vue', () => {
  let wrapper
  let localVue
  let getters
  let store
  let actions

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Core4ui, {
      router: new Router(),
      config: {
        THEME,
        TITLE: 'SalesAdvisor 2',
        APP_IDENTIFIER: 'core'
      },
      store: new Vuex.Store()
    })
  })

  it('renders sa-clients', () => {
    actions = {
      [FETCH_CLIENTS]: jest.fn()
    }
    getters = {
      clients: () => []
    }
    store = getStore(getters, actions)
    wrapper = mount(SaClients, { localVue, store, router })

    expect(wrapper.contains('.c4-page')).toBe(true)
    const header = wrapper.find('.page-header-content')
    expect(header.text()).toMatch(/Welcome/)
  })

  it('renders display clients when available', () => {
    actions = {
      [FETCH_CLIENTS]: jest.fn()
    }
    getters = {
      clients: () => [{
        '_id': '4130edb65adb11e98647d663bd873d93',
        'name': 'Client1',
        'etag': '76c22390-d50b-4dad-9e73-6cf365a09daa',
        'timestamp': '2019-01-21T10:02:51.521000',
        'author': 'eha'
      },
      {
        '_id': '4130edb65adb11e98647d663bd871548',
        'name': 'Client2',
        'etag': '76c22390-d50b-4dad-9e73-6cf365a09daa',
        'timestamp': '2019-04-30T16:02:51.521000',
        'author': 'lst'
      },
      {
        '_id': '4130edb65adb11e98647d663xxxx4587',
        'name': 'Client3',
        'etag': '76c22390-d50b-4dad-9e73-6cf365a09daa',
        'timestamp': '2019-04-30T17:20:51.521000',
        'author': 'wic'
      }]
    }
    store = getStore(getters, actions)
    wrapper = mount(SaClients, { localVue, store, router })
    const clients = wrapper.findAll('.v-responsive.v-image').length
    expect(clients).toBe(3)
  })
  it('renders displays empty message when no clients created', () => {
    actions = {
      [FETCH_CLIENTS]: jest.fn()
    }
    getters = {
      clients: () => []
    }
    store = getStore(getters, actions)
    wrapper = mount(SaClients, { localVue, store, router })
    const clients = wrapper.findAll('.v-responsive.v-image').length
    expect(clients).toBe(0)
    const warning = wrapper.findAll('.v-alert.warning')
    expect(warning.exists()).toBe(true)

    const warningContent = wrapper.find('.v-alert.warning .grey--text')
    expect(warningContent.text()).toMatch(/Please add a client/)
  })
})
