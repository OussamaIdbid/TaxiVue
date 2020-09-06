import Vuex from 'vuex'
import Vue from 'vue'

import currentUser from './modules/CurrentUser';

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        currentUser
    }
})