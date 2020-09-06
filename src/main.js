import Vue from 'vue'
import App from './App.vue'
require('@/assets/main.scss')
import AOS from 'aos'
import 'aos/dist/aos.css'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import '@trevoreyre/autocomplete-vue/dist/style.css'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueResource from 'vue-resource'
import router from './router'
import store from './Store'


Vue.use(Buefy)
Vue.use(VueResource)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),

  created(){
    AOS.init();

  },

  router,
  vuetify,
  store
}).$mount('#app')
