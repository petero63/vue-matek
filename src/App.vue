<template>
<div id="app">
<ExampleText/>
<ExampleSteps/>

<div class="badge actionbox">
<img  v-if="startBtnVisible" src="/images/start1.svg" width="40px" @click="startSolution()" class="actionbuttons"/>
<img  v-if="restartBtnVisible"  src="/images/start0.svg" width="40px" @click="restartSolution()" class="actionbuttons"/>

<img  v-if="autoplayBtnVisible" src="/images/autoplay.svg" width="40px" @click="autoplaySolutionNew()" class="actionbuttons"/>

<img v-if="showAllBtnVisible"  v-bind:src="'/images/'+imgBtnAll" width="40px" @click="showAll()" class="actionbuttons"/>
<img v-else  v-bind:src="'/images/'+imgBtnAll"  width="40px" @click="hideAll()" class="actionbuttons"/>

<img v-bind:src="'/images/'+imgBtnSolution" width="40px" @click="showSolution()" class="actionbuttons"/>


<img v-bind:src="'/images/'+imgBtnTheory" width="40px" @click="test1()" class="actionbuttons"/>
<button type="button" class="btn btn-primary" @click="speedUp()">+</button>
<div class="d-inline-block p-3" v-html=speed></div>
<button type="button" class="btn btn-primary" @click="speedDown()">-</button>
</div>

<ExampleSolution :showSolutionContainer="showSolutionContainer"/>
<hr>
<button type="button" class="btn btn-primary" @click="otto()">otto</button>
<div>Counter is: {{scounter}} Token: {{token}}</div>
	<ul class="nav nav-pills">
		<li role="presentation"><router-link to="/">&nbsp;Címoldal&nbsp; </router-link></li>
		<li role="presentation"><router-link to="/examplesteps">&nbsp;Példa&nbsp; </router-link></li>
		<li role="presentation"><router-link to="/teacher">&nbsp; Tanár&nbsp; </router-link></li>
		<li role="presentation"><router-link to="/student">&nbsp;Diák&nbsp;</router-link></li>
		<li role="presentation"> <a href="/#/teacher">&nbsp;Protected&nbsp;</a> </li>
		<li role="presentation"><router-link to="/signup">&nbsp;Sign Up&nbsp;</router-link></li>
		<li role="presentation"><router-link to="/signin">&nbsp;Sign In&nbsp;</router-link></li>
	</ul>
	<router-view></router-view>
<hr>
</div>
</template>

<script>
import axios from 'axios';
import Tutorial from './components/Tutorial.vue';
import Header from './components/Header.vue';
import ExampleText from './components/ExampleText.vue';
import ExampleSteps from './components/ExampleSteps.vue';
import ExampleSolution from './components/ExampleSolution.vue';

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
			startBtnVisible:true,
			restartBtnVisible:false,
			autoplayBtnVisible:true,
			showAllBtnVisible:true,
			imgBtnSolution:"solution1.svg",
			imgBtnAll:"all1.svg",
			imgBtnTheory:"theory1.svg",
			showSolutionContainer:false,
			showExampleStepsContainer:false,
			speed:"1.0 s"
		}
	},
	computed: {
		scounter () {
			return this.$store.state.storeCounter;
			//return 333;
		},
		token () {
			return this.$store.state.idToken;
		}
	},
	methods: {

	  otto () {
		  //alert("otto");
			this.$store.state.storeCounter=333;
			this.$store.state.idToken="dfkjasd4234KDljfsaldkx";
	  },

		speedUp () { 
			this.$children[1].autoplaySpeed=this.$children[1].autoplaySpeed+500;
			var seconds=this.$children[1].autoplaySpeed/1000;
			this.speed=seconds+ " s";
		
		},
		speedDown () { 
			this.$children[1].autoplaySpeed=this.$children[1].autoplaySpeed-500;
			var seconds=this.$children[1].autoplaySpeed/1000;
			this.speed=seconds+ " s";

		},

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
			//alert("xxxx");


//			for (var i = 1; i < this.$children[1].lastStepIndex; i++) { document.getElementById(i).style.display = "none"; }

			//document.getElementById(0).style.display = "block";
			document.getElementById(0).setAttribute("class", "d-inline-block showFormula animated zoomIn");
			//Létezik-e help az első lépésre

			if (this.$children[1].steps[0].help.length > 0){
				this.$children[1].helpAvailableButton=true;
				this.$children[1].currentStepIndex=-1;
			} 
			else { 
				this.helpAvailableButton=false;
			}
			//this.hideAll();
			console.log("Start Solution");
			this.startBtnVisible=false;
			this.restartBtnVisible=true;
			this.showExampleStepsContainer=true;

			document.getElementById("exampleStepsContainer").style.display = "block";
			console.log("showExampleStepsContainer= "+this.showExampleStepsContainer);
			},

		autoplaySolutionNew  () {
			this.$children[1].autoplaySolution();
		},
		autoplaySolutionOld  () {
			var nnn=this.$children[1].steps.length;
			//var nnn=this.$children[1].steps[2].nl;
			console.log("nnn="+nnn);
			this.showExampleStepsContainer=true;
			this.$children[1].lastStepIndex;
//			document.getElementById("exampleStepsContainer").style.display = "block";

	//		document.getElementById("exampleStepsContainer").style.display = "none";
			for (var i = 0; i < this.$children[1].lastStepIndex; i++) {
				document.getElementById(i).style.display = "none";
			}

			document.getElementById(0).setAttribute("class", "d-inline-block showFormula animated zoomIn");
			//for (var i = 1; i < this.$children[1].lastStepIndex; i++) {
			for (let i=1; i<this.$children[1].lastStepIndex; i++) {
			    setTimeout( function timer(){

				document.getElementById(i).setAttribute("class", "d-inline-block showFormula animated zoomIn");

				var elmnt = document.getElementById(i);
    			elmnt.scrollIntoView();
		//		console.log("i="+i);
//				nl=this.$children[1].steps[i].nl;
//			 nl=this.$children[1].steps[2].nl;
	//			console.log("nl="+nl);

//			var nnn=this.$children[1].steps.length;
	//		console.log("nnn="+nnn);
		   }, i*this.autoplaySpeed );
			}

		},

		restartSolution () {

			
			console.log("Restart Solution");
			this.restartBtnVisible=false;
			this.hideAll();
			this.startBtnVisible=true;
		//	this.showExampleStepsContainer=true;
			document.getElementById(0).style.display = "block";
//			this.startBtnVisible=true;;

			console.log("showExampleStepsContainer= "+this.showExampleStepsContainer);

			for (var i = 0; i < this.$children[1].lastStepIndex; i++) {
				document.getElementById(i).setAttribute("class", "hideFormula");
			}

			},

		showAll () {

			this.showExampleStepsContainer=true;
			this.$children[1].lastStepIndex;
			document.getElementById("exampleStepsContainer").style.display = "block";
			for (var i = 0; i < this.$children[1].lastStepIndex; i++) {
					if (this.$children[1].steps[i].nl==0) { document.getElementById(i).setAttribute("class", "d-inline-block showFormula animated zoomIn"); }
					else { document.getElementById(i).setAttribute("class", "showFormula animated zoomIn");}
				//document.getElementById(i).style.display = "block";
			}
			this.startBtnVisible=false;
			this.restartBtnVisible=false;
			this.showAllBtnVisible=false;
			this.imgBtnAll="all0.svg"
		},

		hideAll (){
			this.showExampleStepsContainer=false;
			document.getElementById("exampleStepsContainer").style.display = "none";
			for (var i = 0; i < this.$children[1].lastStepIndex; i++) {
				document.getElementById(i).setAttribute("class", "hideFormula");
			}
			this.showAllBtnVisible=true;
			this.startBtnVisible=true;
			this.restartBtnVisible=false;
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

