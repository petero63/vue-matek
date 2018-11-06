import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

import Home from './components/Home.vue';
import SignupPage from './components/auth/Signup.vue'
import SigninPage from './components/auth/Signin.vue'
import ExampleSteps from './components/ExampleSteps.vue'
import Student from './components/student/Student.vue';
import Teacher from './components/teacher/Teacher.vue';

Vue.use(VueRouter)

	export const routes = [

{ path: '', component: Home},
{ path: '/examplesteps', component: ExampleSteps},
{ path: '/teacher', component: Teacher},
{ path: '/signup', component: SignupPage },
{ path: '/signin', component: SigninPage },
{
path: '/student',
		component: Student,
		beforeEnter (to, from, next) {
			if (store.state.idToken) { next() } else { next('/signin') }
		}
}
	];

	export default new VueRouter({mode: 'history', routes})
