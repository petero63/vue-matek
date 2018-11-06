import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
//import {routes} from './router'
import router from './router'
import store from './store'
Vue.use(VueRouter);

//const router = new VueRouter ({ routes });

Vue.config.productionTip = false
Vue.config.devtools = false 
var vm=new Vue({
	router,
	store,
  render: h => h(App)
}).$mount('#app')
