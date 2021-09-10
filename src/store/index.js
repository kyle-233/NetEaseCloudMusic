import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import songplay from './modules/SongPlay'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    songplay,
  }
})
