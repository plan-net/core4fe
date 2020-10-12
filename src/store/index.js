import Vue from 'vue'
import Vuex from 'vuex'
<<<<<<< Updated upstream
import createLogger from 'vuex/dist/logger'
import temp from './temp'

const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []
=======
>>>>>>> Stashed changes

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
<<<<<<< Updated upstream
    temp
=======
>>>>>>> Stashed changes
  }
})
