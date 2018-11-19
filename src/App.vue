<template>
<div id="app">
<hr>
<div>Counter is: {{scounter}} Token: {{token}} Async Call Counter {{asyncCallCounter}}</div>
	<ul class="nav nav-pills">
		<li role="presentation"><router-link to="/">&nbsp;Címoldal&nbsp; </router-link></li>
		<li role="presentation"><router-link to="/examplerepository">&nbsp;Példatár&nbsp; </router-link></li>
		<li role="presentation"><router-link to="/teacher">&nbsp; Tanár&nbsp; </router-link></li>
		<li role="presentation"><router-link to="/student">&nbsp;Diák&nbsp;</router-link></li>
		<li role="presentation"> <a href="/#/student">&nbsp;Diák (Protected)&nbsp;</a> </li>
		<li role="presentation"><router-link to="/signup">&nbsp;Sign Up&nbsp;</router-link></li>
		<li role="presentation"><router-link to="/signin">&nbsp;Sign In&nbsp;</router-link></li>
		<li role="presentation"><router-link to="/adminexamplerepository">&nbsp;Adminisztrációs Oldalak&nbsp;</router-link></li>
	</ul>
	<router-view></router-view>
<hr>
</div>
</template>

<script>
import axios from 'axios';
import Tutorial from './components/Tutorial.vue';
import Header from './components/Header.vue';
//import ExampleSteps from './components/example/ExampleSteps.vue';
//import ExampleSolution from './components/example/ExampleSolution.vue';

console.log("Done OK");
//console.log($refs);


export default {
	name: 'app',
        components: {
            appHeader: Header
        },
	data () {
		return {
			counter:88,
		}
	},
	computed: {
		scounter () {
			return this.$store.state.storeCounter;
			//return 333;
		},
		token () {
			return this.$store.state.idToken;
		},
		asyncCallCounter () {
			return this.$store.state.asyncCallCounter;
		}
	},
	methods: {



	

	},
	components: {
	}
}
</script>
<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 10px;

}
.hideFormula { display: none; }
.actionbuttons { 
cursor: pointer;
margin: 0px 5px 0px 5px;
}
.actionbox {
	background:#c5e1ff;
	margin: 10px;
	border-style: solid;
  border-width: 1px;
  border-color: #0070ff;
	align:center;
}
</style>

