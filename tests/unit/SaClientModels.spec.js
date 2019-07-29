import Vue from 'vue'

import Component from '@/components/sa-client/SaClientModels.vue'
import { build } from './helper.js'
import {
  DELETE_MODEL,
  DUPLICATE_MODEL,
  FETCH_CLIENT,
  FETCH_MODEL,
  FETCH_MODELS,
  SET_ACTIVE_MODEL,
  UPDATE_MODEL
} from '@/store/types'
import models from '@/store/models.js'
import { dateFilter } from '../../src/filters'
import { CREATE_MODEL } from '../../src/store/types'

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
const dummyModels = [
  {
    'public': false,
    'name': 'xxfsdfsd',
    'etag': '44c50b1f-9648-446e-9025-3b0e97645063',
    'start': '2014-12-29T00:00:00',
    'timestamp': '2019-06-21T12:40:05.531000',
    'end': '2019-12-23T00:00:00',
    'principal': 'ycyxcycxxy',
    'author': 'admin',
    '_id': '5d0cd025259cb703ffb313e8',
    'client_id': '5d0397e092c7a41d01b2164f'
  },
  {
    'author': 'admin',
    'start': '2014-12-29T00:00:00',
    'end': '2019-12-23T00:00:00',
    'public': false,
    'timestamp': '2019-06-26T08:19:47.561000',
    'principal': 'ycyxcycxxy',
    'etag': '2e8aa2ba-d504-4500-ab4b-da980bd731fd',
    'name': 'adsasdasdsa',
    '_id': '5d132aa35f4dae902bd433f0',
    'client_id': '5d0397e092c7a41d01b2164f'
  }
]
const actions = {
  [FETCH_CLIENT]: jest.fn(),
  [DELETE_MODEL]: jest.fn(),
  [FETCH_MODEL]: jest.fn(),
  [DUPLICATE_MODEL]: jest.fn(),
  [FETCH_MODELS]: jest.fn(),
  [SET_ACTIVE_MODEL]: jest.fn(),
  [UPDATE_MODEL]: jest.fn()
}
const gettersFull = {
  client: () => {
    return dummyClient
  },
  models: () => {
    return dummyModels
  }
}
const gettersEmpty = {
  client: () => {
    return dummyClient
  },
  models: () => {
    return []
  }
}
let storePartsEmpty = {
  actions,
  getters: gettersEmpty
}
let storePartsFull = {
  actions,
  getters: gettersFull
}
Vue.filter('date', dateFilter)
let element
describe('SaClientModels.vue', () => {
  beforeEach(() => {
  })
  it('renders a SaModels Component', () => {
    element = build(Vue, Component, { Vue }, storePartsFull)

    expect(element.wrapper.contains('.v-datatable')).toBe(true)
    const nameTF = element.wrapper.find('.card-headline')
    expect(nameTF.text()).toBe('MODELS')
  })

  it('renders an Empty Component when no Models available', () => {
    element = build(Vue, Component, { Vue }, storePartsEmpty)
    // const empty = element.wrapper.find('.v-alert.warning')
    expect(element.wrapper.contains('.v-datatable')).toBe(false)
    expect(element.wrapper.contains('.v-alert.warning')).toBe(true)
    const empty = element.wrapper.find('.v-alert.warning span')
    expect(empty.text()).toBe('Please add a model.')
  })
  it('renders a SaModels correct count of Models (2) in datatable', () => {
    element = build(Vue, Component, { Vue }, storePartsFull)
    expect(element.wrapper.contains('.v-datatable')).toBe(true)

    const modelTrCount = element.wrapper.findAll('.v-datatable tbody tr').length
    expect(modelTrCount).toBe(2)
  })
  it('dispatches "togglePublic" on clicking on the public/private button', () => {
    element = build(Vue, Component, { Vue }, storePartsFull)
    // first action
    const publicButton = element.wrapper.find('.toggle-public')
    const icon = publicButton.find('.v-icon')
    expect(icon.text()).toBe('visibility_off')
    publicButton.trigger('click')
    expect(actions[UPDATE_MODEL]).toHaveBeenCalled()
    /*    const payload = { _id: '5d0cd025259cb703ffb313e8', public: true }
    expect(actions[UPDATE_MODEL]).toHaveBeenCalledWith(payload) */
    // triggers action so test after action
    element.wrapper.vm.togglePublic = jest.fn()
    element.wrapper.find('.v-datatable tr:last-child .toggle-public').trigger('click')
    expect(element.wrapper.vm.togglePublic).toHaveBeenCalled()
    expect(element.wrapper.vm.togglePublic).toHaveBeenCalledWith(dummyModels[0])
  })
  it('opens "EditDialog" on clicking on the edit button, dispatches FETCH_CLIENTS', () => {
    element = build(Vue, Component, { Vue }, storePartsFull)
    // first action
    const button = element.wrapper.find('.v-datatable tr:last-child .edit')
    button.trigger('click')
    expect(actions[FETCH_MODEL]).toHaveBeenCalled()
    element.wrapper.vm.editModel = jest.fn()
    button.trigger('click')
    expect(element.wrapper.vm.editModel).toHaveBeenCalled()
    expect(element.wrapper.vm.editModel).toHaveBeenCalledWith(dummyModels[0]._id)
  })
  it('duplicates Model when clicking on the duplicate button, dispatches DUPLICATE_MODEL', () => {
    element = build(Vue, Component, { Vue }, storePartsFull)
    // first action
    const button = element.wrapper.findAll('.duplicate').at(1)
    button.trigger('click')
    expect(actions[DUPLICATE_MODEL]).toHaveBeenCalled()
    element.wrapper.vm.duplicateModel = jest.fn()
    button.trigger('click')
    expect(element.wrapper.vm.duplicateModel).toHaveBeenCalled()
    expect(element.wrapper.vm.duplicateModel).toHaveBeenCalledWith(dummyModels[0]._id)

    // CREATE_MODEL used for duplication
    const state = {
      all: JSON.parse(JSON.stringify(dummyModels))
    }
    expect(state.all.length).toBe(2)
    models.mutations[CREATE_MODEL](state, Object.assign(dummyModels[0], { _id: '1337' }))
    expect(state.all.length).toBe(3)
  })
})
/* describe('SaClientModels.vue 2', () => {
  beforeEach(() => {
    element = build(Vue, Component, { Vue }, storePartsEmpty)
  })
}) */
