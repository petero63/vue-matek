import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.config.devtools = false 
var vm=new Vue({
  render: h => h(App)
}).$mount('#app')
