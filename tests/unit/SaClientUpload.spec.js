import Vue from 'vue'
import { UPLOAD_CLIENT_FILE } from '@/store/types'
import Component from '@/components/sa-client/SaClientUpload.vue'
import { $beforeEach, build } from './helper.js'

const dummyClient = {}

describe('SaClientUpload.vue', () => {
  let storeParts = {
    actions: {
      [UPLOAD_CLIENT_FILE]: jest.fn()
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

  it('renders a SaUpload Component', () => {
    expect(element.wrapper.contains('.file-uploads')).toBe(true)

    const button = element.wrapper.find('.v-btn--large')
    expect(button.text()).toMatch(/Choose a file to upload/)
    // expect(element.wrapper.contains('.v-textarea')).toBe(true)
    // expect(shallowMount(Component).isVueInstance()).toBe(true)
  })
})
