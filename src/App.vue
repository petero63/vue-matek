<template>
<div id="app">
<ExampleText/>
<img v-bind:src="'/images/'+imgBtnStart" width="40px" @click="showSolution()" class="actionbuttons"/>
<img v-bind:src="'/images/'+imgBtnSolution" width="40px" @click="showSolution()" class="actionbuttons"/>
<img v-bind:src="'/images/'+imgBtnAll" width="40px" @click="showSolution()" class="actionbuttons"/>
<img v-bind:src="'/images/'+imgBtnTheory" width="40px" @click="showSolution()" class="actionbuttons"/>
	<div class="clearfix"></div>
<ExampleSteps/>
<ExampleSolution :okToShow="okToShow"/>
	</div>
</template>

<script>
import axios from 'axios'
import ExampleText from './components/ExampleText.vue'
import ExampleSteps from './components/ExampleSteps.vue'
import ExampleSolution from './components/ExampleSolution.vue'
console.log("Done OK");

export default {
	name: 'app',
	data () {
		return {
			imgBtnStart:"start1.svg",
			imgBtnSolution:"solution1.svg",
			imgBtnAll:"all1.svg",
			imgBtnTheory:"theory1.svg",
			okToShow:false

		}
	},
	methods: {
		showSolution () {
			if (this.imgBtnSolution=="solution1.svg") {this.imgBtnSolution="solution0.svg";this.okToShow=true;}
			else { this.imgBtnSolution="solution1.svg";this.okToShow=false;}
			
			}
		
	},
	components: {
		ExampleText,
		ExampleSteps,
		ExampleSolution
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
.actionbuttons { 
cursor: pointer;
margin: 0px 5px 0px 5px;
}
</style>
