<template>
<div id="app">
<ExampleText/>
<img v-bind:src="'/images/'+imgBtnStart" width="40px" @click="showFirstStep()" class="actionbuttons"/>
<img v-bind:src="'/images/'+imgBtnSolution" width="40px" @click="showSolution()" class="actionbuttons"/>

<img v-if="test"  v-bind:src="'/images/'+imgBtnAll" width="40px" @click="showAll()" class="actionbuttons"/>
<img v-else  v-bind:src="'/images/'+imgBtnAll"  width="40px" @click="hideAll()" class="actionbuttons"/>

<img v-bind:src="'/images/'+imgBtnTheory" width="40px" @click="hideAll()" class="actionbuttons"/>
<div class="clearfix"></div>
<ExampleSteps :okToShowFirstStep="okToShowFirstStep" ref="child"/>
<ExampleSolution :okToShowSolution="okToShowSolution"/>
	<div id="xxx"></div>
	</div>
</template>

<script>
import axios from 'axios'
import ExampleText from './components/ExampleText.vue'
import ExampleSteps from './components/ExampleSteps.vue'
import ExampleSolution from './components/ExampleSolution.vue'

console.log("Done OK");
//console.log($refs);


export default {
	name: 'app',
	data () {
		return {
			test:true,
			imgBtnStart:"start1.svg",
			imgBtnSolution:"solution1.svg",
			imgBtnAll:"all1.svg",
			imgBtnTheory:"theory1.svg",
			okToShowSolution:false,
			okToShowFirstStep:false

		}
	},
	methods: {
		showSolution () {
			if (this.imgBtnSolution=="solution1.svg") {this.imgBtnSolution="solution0.svg";this.okToShowSolution=true;}
			else { this.imgBtnSolution="solution1.svg";this.okToShowSolution=false;}
			//document.getElementById("xxx").scrollIntoView();
			document.getElementById("xxx").scrollTop;
			},
		
		showFirstStep () {
			if (this.imgBtnStart=="start1.svg") {this.imgBtnStart="start0.svg";this.okToShowFirstStep=true;}
			else { this.imgBtnStart="start1.svg";this.okToShowFirstStep=false;}
			},
		showAll () {
				document.getElementById("exampleSteps").style.display = "block";
				this.$children[1].showAllSteps();
			this.test=false;
		},
		hideAll (){
				//document.getElementById("exampleSteps").style.display = "none";
					this.$children[1].hideAllSteps();

			this.test=true;
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
