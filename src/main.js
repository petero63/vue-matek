import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import {routes} from './routes'
Vue.use(VueRouter);

const router = new VueRouter ({
	routes
});

Vue.config.productionTip = false
Vue.config.devtools = false 
var vm=new Vue({
	router,
  render: h => h(App)
}).$mount('#app')
