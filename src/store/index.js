import Vue from 'vue'
import Vuex from 'vuex'
import codeStatus from './codeStatus'
import isLogin from './isLogin'
import product from './product'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    codeStatus,
    isLogin,
    product,
  }
})
