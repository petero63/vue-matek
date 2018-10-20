<template>
<div id="app">
<ExampleText/>
<ExampleSteps :showExampleStepsContainer="showExampleStepsContainer"/>

<div class="badge actionbox">

<img  v-if="startSolutionBtnVisible" src="/images/start1.svg" width="40px" @click="startSolution()" class="actionbuttons"/>
<img  v-else  src="/images/start0.svg" width="40px" @click="restartSolution()" class="actionbuttons"/>

<img v-bind:src="'/images/'+imgBtnSolution" width="40px" @click="showSolution()" class="actionbuttons"/>

<img v-if="showAllBtnVisible"  v-bind:src="'/images/'+imgBtnAll" width="40px" @click="showAll()" class="actionbuttons"/>
<img v-else  v-bind:src="'/images/'+imgBtnAll"  width="40px" @click="hideAll()" class="actionbuttons"/>

<img v-bind:src="'/images/'+imgBtnTheory" width="40px" @click="hideAll()" class="actionbuttons"/>
</div>
<ExampleSolution :showSolutionContainer="showSolutionContainer"/>
</div>
</template>

<script>
import axios from 'axios'
import Tutorial from './components/Tutorial.vue'
import ExampleText from './components/ExampleText.vue'
import ExampleSteps from './components/ExampleSteps.vue'
import ExampleSolution from './components/ExampleSolution.vue'

console.log("Done OK");
//console.log($refs);


export default {
	name: 'app',
	data () {
		return {
			showAllBtnVisible:true,
			startSolutionBtnVisible:true,
			imgBtnSolution:"solution1.svg",
			imgBtnAll:"all1.svg",
			imgBtnTheory:"theory1.svg",
			showSolutionContainer:false,
			showExampleStepsContainer:false
		}
	},
	methods: {
		showSolution () {
			if (this.imgBtnSolution=="solution1.svg") {
				this.imgBtnSolution="solution0.svg";
				this.showSolutionContainer=true;
				document.getElementById("solutionContainer").setAttribute("class", "showFormula  animated flipInY slow");
			}
			else { 
				this.imgBtnSolution="solution1.svg";
				document.getElementById("solutionContainer").setAttribute("class", "showFormula  animated flipOutY fast");
				//this.showSolutionContainer=false;
			}
		},
		
		hideSolution () {
			if (this.imgBtnSolution=="solution1.svg") {this.imgBtnSolution="solution0.svg";this.showSolutionContainer=true;}
			else { this.imgBtnSolution="solution1.svg";this.showSolutionContainer=false;}
			},
	
		startSolution () {
			if (this.startSolutionBtnVisible) {this.startSolutionBtnVisible=false;this.showExampleStepsContainer=true;}
//			else { this.imgBtnStart="start1.svg";this.showExampleStepsContainer=false;}
			},

		restartSolution () {
			this.hideAll();
			this.startSolutionBtnVisible=true;
			this.showExampleStepsContainer=true;
			document.getElementById(0).style.display = "block";
			},
		showAll () {
			this.$children[1].lastStepIndex;
			document.getElementById("exampleStepsContainer").style.display = "block";
			for (var i = 0; i < this.$children[1].lastStepIndex; i++) {
				document.getElementById(i).style.display = "block";
			}
			this.showAllBtnVisible=false;
			this.startSolutionBtnVisible=false,
			this.imgBtnAll="all0.svg"
		},
		hideAll (){
			document.getElementById("exampleStepsContainer").style.display = "none";
			for (var i = 0; i < this.$children[1].lastStepIndex; i++) {
				document.getElementById(i).style.display = "none";
			}
			this.showAllBtnVisible=true;
			this.startSolutionBtnVisible=true;
			this.imgBtnAll="all1.svg"
		}
	},
	components: {
		Tutorial,
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
.actionbox {
	background:#c5e1ff;
	margin: 10px;
	border-style: solid;
  border-width: 1px;
  border-color: #0070ff;
	align:center;
}
</style>

