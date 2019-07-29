import {createLocalVue, mount} from '@vue/test-utils';
import Vuex from 'vuex'
import Component from '@/components/sa-client/sub/NewScenario.vue'
import Router from 'vue-router'
import {FETCH_CLIENTS,} from '@/store/types'
import Core4ui from "core4ui/core4";
import THEME from "core4ui/core4/themes/core4/theme-vuetify";
import router from '@/router'
import moment from 'moment'

/**
 * Adds a warapping `div data-app="true"` to the body so that we don't
 * get Vuetify complaining about missing data-app attribute for some components.
 *
 * @return undefined
 */
function addElemWithDataAppToBody() {
  const app = document.createElement('div');
  app.setAttribute('data-app', true);
  document.body.append(app);
};

function getStore(getters, actions) {
  return new Vuex.Store({
    getters, actions
  })
}
addElemWithDataAppToBody();
const build = (options) => {

  let getters
  let store
  let actions
  actions = {
    [FETCH_CLIENTS]: jest.fn()
  }
  getters = {
    scenario: () => {
      return {
        'author': 'eha',
        'timestamp': '2019-02-19T15:32:02.235000',
        'name': 'Scenario 2',
        'start': '2018-01-01T00:00:00',
        'end': '2019-12-23T00:00:00',
        'etag': '25d28d62-578f-483b-8fe6-2fd1f64d7ec7',
        'client': '4130edb6-5adb-11e9-8647-d663bd873d93',
        'model': '1234556',
        '_id': '5c458c75f10738ed1b24cf11d'
      }
    },
    models: () => [
      {
        'name': 'Bahlsen Model 1',
        '_id': '1234556',
        'etag': '5adb-11e9-8647',
        'public': true,
        'data': {
          'modelling_start': '2008-05-04 14:28:03',
          'modelling_end': '2017-09-04 14:28:03',
          'variables': [
            {
              'long_name': 'Woche',
              'type': 'TIME',
              'user': true,
              'short_name': 'week',
              'visible': true
            }
          ]
        }
      },
      {
        'name': 'Bahlsen Model 2',
        '_id': '1234ydsjnkshf56',
        'etag': '5adb-114ydsjnkse9-8647',
        'public': false,
        'data': {
          'modelling_start': '2012-05-04 15:28:03',
          'modelling_end': '2019-05-04 15:28:03',
          'variables': [
            {
              'long_name': 'Woche',
              'type': 'TIME',
              'user': true,
              'short_name': 'week',
              'visible': true
            }
          ]
        }
      }
    ]
  }
  store = getStore(getters, actions)
  const wrapper2 = mount(Component, Object.assign(options, {store}))
  return {
    wrapper: wrapper2,
    userSearchForm: () => wrapper2.find('div')
  }
}
describe('NewScenario.vue', () => {
  let wrapper
  let localVue

  beforeEach(() => {

    localVue = createLocalVue();
    localVue.filter('date', (value) => {
      if (value) {
        return moment(String(value)).format('DD.MM.YYYY') // H:mm
      }
    })
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

  it('renders new-scenario dialog', () => {

    const element = build({localVue, router, attachToDocument: true})
    wrapper = element.wrapper
    console.log(wrapper);
  })

})
