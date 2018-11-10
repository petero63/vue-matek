import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

import Home from './components/Home.vue';
import SignUpPage from './components/auth/SignUp.vue'
import SignInPage from './components/auth/SignIn.vue'
import ExampleSteps from './components/example/ExampleSteps.vue'
import Student from './components/student/Student.vue';
import Teacher from './components/teacher/Teacher.vue';

Vue.use(VueRouter)

	export const routes = [

{ path: '', component: Home},
{ path: '/examplesteps', component: ExampleSteps},
{ path: '/teacher', component: Teacher},
{ path: '/signup', component: SignUpPage },
{ path: '/signin', component: SignInPage },
{
path: '/student',
		component: Student,
		beforeEnter (to, from, next) {
			if (store.state.idToken) { next() } else { next('/signin') }
		}
}
	];

	export default new VueRouter({mode: 'history', routes})
