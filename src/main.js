import Vue from "vue";
import App from "./App.vue";
require("@/assets/main.scss");
import AOS from "aos";
import "aos/dist/aos.css";
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import "@trevoreyre/autocomplete-vue/dist/style.css";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import VueResource from "vue-resource";
import router from "./router";
import store from "./Store";
import VueCookies from "vue-cookies";
import VueCryptojs from "vue-cryptojs";
import MaterialIcons from "material-design-icons";
import InfiniteLoading from "vue-infinite-loading";
import Moment from "moment";
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
Moment.locale("nl");

Vue.use(InfiniteLoading, {
  /* options */
});
Vue.use(VueCryptojs);
Vue.use(VueCookies);
Vue.use(Buefy);
Vue.use(VueResource);
Vue.use(MaterialIcons);
Vue.use(Moment);
Vue.config.productionTip = false;

store.dispatch("me").then(() => {
  new Vue({
    render: (h) => h(App),

    created() {
      AOS.init();
    },

    router,
    vuetify,
    store,
  }).$mount("#app");
});
