import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user';
import flow from './modules/flow';
import nav from './modules/nav';

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    user,
    flow,
    nav
  }
})