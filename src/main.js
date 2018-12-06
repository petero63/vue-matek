import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMathjax from 'vue-mathjax'
import App from './App.vue'
//import {routes} from './router'
import router from './router'
import store from './store'
//import dotenv from 'dotenv'

//dotenv.config()
//dotenv.config({path: "./.env"});
//const config = dotenv.config()
//if(config.error){ console.log('Could not load env file', config.error) }
//console.log("DBHOST: "+process.env.DBHOST)
//console.log("DBHOST: "+process.env)


Vue.use(VueRouter);
Vue.use(VueMathjax);
//dotenv.config()
//console.log("xxx "+process.env.DBHOST)
//console.log("xxx "+process.env)
//console.log("xxx "+process.env.DBHOST)
//const router = new VueRouter ({ routes });

Vue.config.productionTip = false
Vue.config.devtools = false 
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
