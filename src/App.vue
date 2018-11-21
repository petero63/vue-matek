<template>
<div id="app">

<!-- Container (Navbar) -->
<nav class="navbar fixed-top navbar-expand-lg navbar-dark" style="background-color: #000066;">
  <a class="navbar-brand" href="/">Math Reference</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active"> <a class="nav-link" href="/#" @click="goToPage('/')">Címoldal <span class="sr-only">(current)</span></a> </li>
      <li class="nav-item"> <a class="nav-link" href="#" @click="goToPage('examplesteps',1)">Mintapélda</a> </li>
      <li class="nav-item"> <a class="nav-link" href="#" @click="goToPage('examplerepository')">Példatár</a> </li>
      <li class="nav-item"> <a class="nav-link" href="#" @click="goToPage('teacher')">Tanár</a> </li>
      <li class="nav-item"> <a class="nav-link" href="#" @click="goToPage('student')">Diák (Protected)</a> </li>
      <li class="nav-item"> <a class="nav-link" href="#" @click="goToPage('signup')">Sign Up</a> </li>
      <li class="nav-item"> <a class="nav-link" href="#" @click="goToPage('signin')">Sign In</a> </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Adminisztrációs oldalak 
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#" @click="goToPage('adminexamplerepository')">Új példa létrhozása</a>
          <a class="dropdown-item" href="#" @click="goToPage('adminexamplerepository')">Példák listázása</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
<!-- Container (/Navbar) -->
<hr>
<div>Counter is: {{scounter}} Token: {{token}} Async Call Counter {{asyncCallCounter}}</div>
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

goToPage(page,id) {
	//this.$router.push({ path: '/examplesteps/'+id });
	//this.$router.push({ path: page });
	this.$router.push({ path: `/${page}` });
	if (id>0) {
	this.$router.push({ path: `/${page}/${id}` });
	}
	
}


	

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

