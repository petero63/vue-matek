import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

import Home from './components/Home.vue';
import Student from './components/student/Student.vue';
import Teacher from './components/teacher/Teacher.vue';

Vue.use(VueRouter)

export const routes = [

	{ path: '', component: Home},
	{ path: '/teacher', component: Teacher},
	{
    path: '/student',
    component: Student,
    beforeEnter (to, from, next) {
      if (store.state.idToken) { next() } else { next('/') }
    }
	}
];

export default new VueRouter({mode: 'history', routes})
