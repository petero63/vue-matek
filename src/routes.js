import Home from './components/Home.vue';
import Student from './components/student/Student.vue';
import Teacher from './components/teacher/Teacher.vue';
export const routes = [

	{ path: '', component: Home},
	{ path: '/teacher', component: Teacher},
	{ path: '/student', component: Student},
];
