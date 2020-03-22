import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import {sync} from 'vuex-router-sync'
import store from './store'
import Navbar from './components/Navbar.vue'

Vue.config.productionTip = false

sync(store, router)
Vue.component('Navbar', Navbar)
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
