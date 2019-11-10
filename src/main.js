import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';
import VueOffline from 'vue-offline';
import './registerServiceWorker'

Vue.use(Ionic);
Vue.use(VueOffline)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
