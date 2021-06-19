import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
//import * as Cookies from 'js-cookie'
import currentUser from './modules/CurrentUser';
import CurrentReservation from './modules/CurrentReservation';

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        currentUser,
        CurrentReservation
    },
    plugins: [
        createPersistedState({
          paths: ['CurrentReservation.reservation','CurrentReservation.currentStep','CurrentReservation.userDetails', 'CurrentReservation.isCalculated']
        }),
      ],
})