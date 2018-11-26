<template>
<div id="app">
<!-- Navbar Container  -->
<nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #122891;">
  <a class="navbar-brand" href="/">Math Reference</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active"> <a class="nav-link" href="#" @click="goToPage('')">Címoldal <span class="sr-only">(current)</span></a> </li>
      <li class="nav-item"> <a class="nav-link" href="#" @click="goToPage('examplesteps',1)">Mintapélda</a> </li>
      <li class="nav-item"> <a class="nav-link" href="#" @click="goToPage('examplerepository')">Példatár</a> </li>
      <li class="nav-item"> <a class="nav-link" href="#" @click="goToPage('teacher')">Tanár</a> </li>
      <li class="nav-item"> <a class="nav-link" href="#" @click="goToPage('dashboard')">Vezérlőpult</a> </li>
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
<!-- Navbar Container  -->

<!-- Router Container  -->
<div class="container">
	<router-view></router-view>
</div>
<!-- /Router Container  -->

</div>
</template>

<script>
import axios from 'axios';
//import ExampleSteps from './components/example/ExampleSteps.vue';
//import ExampleSolution from './components/example/ExampleSolution.vue';

console.log("Done OK");
//console.log($refs);


export default {
	name: 'app',
        components: {
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

}
.jumbotron {
    padding: 0.5em 0.6em;
    h1 {
        font-size: 2em;
    }
    p {
        font-size: 1.2em;
        .btn {
            padding: 0.5em;
        }
    }
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

