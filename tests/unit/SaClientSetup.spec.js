import Vue from 'vue'
import router from '@/router'

import Component from '@/components/sa-client/SaClientSetup.vue'
import { UPDATE_CLIENT } from '@/store/types'
import { build, $beforeEach } from './helper.js'

const dummyClient = {
  'data': { 'dataframe': { 'dtypes': [], 'rows': 0, 'columns': [] } },
  'timestamp': '2019-06-21T06:24:26.933930',
  'end': '2019-06-10T00:00:00',
  'author': 'admin',
  'start': '2019-06-10T00:00:00',
  'name': 'asdaydasd',
  '_id': '5d0390f192c7a41d01b21609',
  'etag': '4ef7d978-e7d5-4ea1-a93b-e4456f6187b1',
  'principal': 'asdaydasda'
}

describe('SaClientSetup.vue', () => {
  let storeParts = {
    actions: {
      [UPDATE_CLIENT]: jest.fn()
    },
    getters: {
      client: () => {
        return dummyClient
      }
    }
  }
  let element
  beforeEach(() => {
    $beforeEach(Vue)
    element = build(Component, { Vue }, storeParts)
  })

  it('renders a SaSetup Component', () => {
    expect(element.wrapper.contains('.v-text-field')).toBe(true)
    expect(element.wrapper.contains('.v-textarea')).toBe(true)
    // expect(shallowMount(Component).isVueInstance()).toBe(true)
  })
  it('renders a SaSetup Component', () => {
    expect(element.wrapper.vm.name).toBe(dummyClient.name)
    // const nameTF = element.wrapper.find('.v-text-field input')
    // expect(nameTF.text()).toBe(dummyClient.name)
  })
})
