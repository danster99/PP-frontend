import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import './assets/sass/style.scss'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')