import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from 'axios';

axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

// import './common/style/index.scss'

new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
