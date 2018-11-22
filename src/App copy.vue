<template>
<div id="app">

<!-- Navbar Container  -->
<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="#myPage"><span class="glyphicon glyphicon-ok-circle"></span>Math Reference</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav navbar-right">
        <li><a href="" @click="goToPage('/')">Címoldal</a></li>
        <li><a href="#" @click="goToPage('examplesteps',1)">Mintapélda</a></li>
        <li><a href="#" @click="goToPage('examplerepository')">Példatár</a></li>
      <li><a class="nav-link" href="#" @click="goToPage('student')">Diák (Protected)</a> </li>
      <li><a class="nav-link" href="#" @click="goToPage('signin')">Sign In</a> </li>
      <li><a class="nav-link" href="#" @click="goToPage('adminexamplerepository')">Admin</a> </li>

      </ul>
    </div>
  </div>
</nav>
<!-- Navbar Container  -->

<div class="container">
<hr>
	<router-view></router-view>
<hr>
<div class="jumbotron">
  <h3>Szegedi Tudományegyetem</h3>
  <p>Természettudományi és Informatikai Kar</p>
</div>
</div>
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
	margin-top: 10px;

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

