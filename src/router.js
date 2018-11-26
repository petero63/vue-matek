import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

import Home from './components/Home.vue';
import Test from './components/Test.vue';
import SignUpPage from './components/auth/SignUp.vue'
import SignInPage from './components/auth/SignIn.vue'
import ExampleRepository from './components/example/ExampleRepository.vue'
import ExampleSteps from './components/example/ExampleSteps.vue'
import ExampleList from './components/example/ExampleList.vue'
import Student from './components/student/Student.vue';
import Teacher from './components/teacher/Teacher.vue';
import DashBoard from './components/auth/DashBoard.vue';
import EventList from './components/auth/EventList.vue';
import EventExamples from './components/auth/EventExamples.vue';

//ADMIN
import AdminExample from './components/admin/Example.vue';
import AdminExampleText from './components/admin/ExampleText.vue';
import AdminExampleList from './components/admin/ExampleList.vue';
import AdminExampleRepository from './components/admin/ExampleRepository.vue'

Vue.use(VueRouter)

	export const routes = [

{ path: '', component: Home},
{ path: '/test', component: Test},
{ path: '/examplerepository', component: ExampleRepository},
{ path: '/examplesteps/:id', component: ExampleSteps},
{ path: '/examplelist/:idBook', component: ExampleList},
{ path: '/signup', component: SignUpPage },
{ path: '/signin', component: SignInPage },

{ path: '/eventlist/:id', component: EventList},
{ path: '/eventexamples/:id', component: EventExamples},

//ADMIN
{ path: '/adminexamplerepository', component: AdminExampleRepository},
{ path: '/adminexample/:id', component: AdminExample },
{ path: '/adminexampletext/:id', component: AdminExampleText },
{ path: '/adminexamplelist/:id', component: AdminExampleList },

//AUTH
{
path: '/dashboard',
		component: DashBoard,
		beforeEnter (to, from, next) {
			if (store.state.idToken) { next() } else { next('/signin') }
		}
},

{
path: '/teacher',
		component: Teacher,
		beforeEnter (to, from, next) {
			if (store.state.idToken) { next() } else { next('/signin') }
		}
},

{
path: '/eventlist/:id',
		component: EventList,
		beforeEnter (to, from, next) {
			if (store.state.idToken) { next() } else { next('/signin') }
		}
},
	];

	export default new VueRouter({mode: 'history', routes})
