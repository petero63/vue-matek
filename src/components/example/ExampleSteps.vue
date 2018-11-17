<template>
<div>
<!-- Example Text-->

<button type="button" class="btn btn-primary" @click="signIn()">SignIn</button>
	<div class="alert alert-primary mathFormulaText border-primary animated flipInY slow" v-html=example.pageContent ></div>
<!-- Example Text-->

<!-- Example Steps-->
<h2>Példa lépések</h2>
<div v-show="showExampleStepsContainer" id="exampleStepsContainer" class="animated zoomIn">
		<div class="mathFormula animated zoomIn">
			<div 
			  v-bind:class=item.class 
			  v-for="(item, index) in steps" 
			  v-html=item.formula v-on:click="nextStep(index)" 
			  v-bind:id="index"
			>
		</div>

		<div id="helpContent" v-show=helpAvailableContent class="helpBaseContentClass animated flipInY slow" v-on:click="hideHelpContent()" v-html=steps[currentStepIndex+1].help></div>
		<div id="helpButton" v-if="helpAvailableButton" class="helpBaseButtonClass animated slideInLeft" v-on:click="showHelpContent()">Segítség elérhető</div>
	</div>
<div id="myProgress" v-if="showProgressBar"><div id="myBar"></div></div>
<audio id="audiohelp" src="/helpsounds/help.mp3"></audio>
</div>
<!-- Example Steps-->

<!-- Example Buttons-->
<div class="badge actionbox">
<img  v-if="startBtnVisible" src="/images/start1.svg" width="40px" @click="startSolution()" class="actionbuttons"/>
<img  v-if="restartBtnVisible"  src="/images/start0.svg" width="40px" @click="restartSolution()" class="actionbuttons"/>

<img  v-if="autoplayBtnVisible" src="/images/autoplay.svg" width="40px" @click="autoplaySolution()" class="actionbuttons"/>

<img v-if="showAllBtnVisible"  v-bind:src="'/images/'+imgBtnAll" width="40px" @click="showAll()" class="actionbuttons"/>
<img v-else  v-bind:src="'/images/'+imgBtnAll"  width="40px" @click="hideAll()" class="actionbuttons"/>

<img v-bind:src="'/images/'+imgBtnSolution" width="40px" @click="showSolution()" class="actionbuttons"/>

<img v-bind:src="'/images/'+imgBtnTheory" width="40px" @click="test1()" class="actionbuttons"/>
<button type="button" class="btn btn-primary" @click="speedUp()">+</button>
<div class="d-inline-block p-3" v-html=speed></div>
<button type="button" class="btn btn-primary" @click="speedDown()">-</button>
</div>
<button type="button" class="btn btn-primary" @click="reloadExampleText()">Reload Example Test</button>
<!-- Example Buttons-->



<!-- Example Solution-->
<div v-show="showSolutionContainer" id="solutionContainer">
	<div class="alert alert-success border-success">
	<h5>Megodldás:</h5>
	<div v-html=exampleSolution.formula></div>
	</div>
</div>
<!-- Example Solution-->

</div>
</template>

<script>

import axios from 'axios'
import {VueMathjax} from 'vue-mathjax'
export default {
	name: 'ExampleSteps',
	props: [''],
	components:{
		'vue-mathjax': VueMathjax
		},
	data () {
		return {
			id:1,
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
			speed:"1.0 s",
			// Solution 
			example:"",
			exampleSolution:"",
			showExampleStepsContainer:true,
			showall:"showall1.svg",
			imgbtn:"solution1.svg",

			helpAvailableContent:false,
			helpAvailableButton:false,
			helpContent:"",
			formulaClass:"showFormula ",
			steps:[
			{"id":0,"id_controler":0,"formula":"","help":"","formula_lg":null,"sort_order":100,"subq":0,"subs":0,"nl":0,"mobile_font_size":null,"formulacharacters":0},
			{"id":0,"id_controler":0,"formula":"","help":"","formula_lg":null,"sort_order":100,"subq":0,"subs":0,"nl":0,"mobile_font_size":null,"formulacharacters":0}
			],
			currentSortOrder:100,
			currentStepIndex:0,
			lastStepIndex:0,
			autoplaySpeed:2000,
			showProgressBar:false
		}
	},
	methods: {

	  signIn () {
		  //alert("otto");
			this.$store.state.storeCounter=333;
			this.$store.state.idToken="dfkjasd4234KDljfsaldkx";
	  },

		speedUp () { 
			this.autoplaySpeed=this.autoplaySpeed+500;
			var seconds=this.autoplaySpeed/1000;
			this.speed=seconds+ " s";
		
		},
		speedDown () { 
			this.autoplaySpeed=this.autoplaySpeed-500;
			var seconds=this.autoplaySpeed/1000;
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

		reloadMathJax () {
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			//MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			//vm.$forceUpdate();
			//this.$router.go(0);
		},

		playsound(){
       var audio = document.getElementById("audiohelp");
       audio.play();
		},

// Autoplay Solution
		autoplaySolution  () {

			this.showProgressBar =true;
//			this.progressbar (10);
//			this.move (2);
			//this.otto(444);
			console.log("length="+this.steps.length);
			this.showExampleStepsContainer=true;
			for (var i = 0; i < this.steps.lastStepIndex; i++) {
				document.getElementById(i).style.display = "none";
			}

			document.getElementById(0).setAttribute("class", "d-inline-block showFormula animated zoomIn");
			//for (var i = 1; i < this.lastStepIndex; i++) {
			for (let i=1; i<this.lastStepIndex; i++) {

			console.log("length="+this.steps.length);
				var a="ooo";

			var steps=this.steps;
			var aps=this.autoplaySpeed;
		    	setInterval( function timer(){

					if (steps[i].nl==0) { document.getElementById(i).setAttribute("class", "d-inline-block showFormula animated zoomIn"); }
					else { document.getElementById(i).setAttribute("class", "showFormula animated zoomIn");}

					// A képernyőt az aktuális képletre fókuszálja
					var elmnt = document.getElementById(i);
	    			elmnt.scrollIntoView();
					// Bar

 			 		var elem = document.getElementById("myBar");   
				  var width = 1;
					var t=aps/100;

				console.log("t="+t);
				  var id = setInterval(frame, t);
				  function frame() {
				    if (width >= 100) {
				      clearInterval(id);
  					  } else {
				      width++; 
				      elem.style.width = width + '%'; 
			  		  }
			  		}
					// Bar
			//		move (5);
			   }, i*this.autoplaySpeed, steps, aps);
			}

		},

// \Autoplay Solution

// Example Steps

		startSolution () {
			//alert("xxxx");


//			for (var i = 1; i < this.lastStepIndex; i++) { document.getElementById(i).style.display = "none"; }

			//document.getElementById(0).style.display = "block";
			document.getElementById(0).setAttribute("class", "d-inline-block showFormula animated zoomIn");
			//Létezik-e help az első lépésre

			if (this.steps[0].help.length > 0){
				this.helpAvailableButton=true;
				this.currentStepIndex=-1;
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

		restartSolution () {

			
			console.log("Restart Solution");
			this.restartBtnVisible=false;
			this.hideAll();
			this.startBtnVisible=true;
		//	this.showExampleStepsContainer=true;
			document.getElementById(0).style.display = "block";
//			this.startBtnVisible=true;;

			console.log("showExampleStepsContainer= "+this.showExampleStepsContainer);

			for (var i = 0; i < this.lastStepIndex; i++) {
				document.getElementById(i).setAttribute("class", "hideFormula");
			}

		},
		nextStep (n) {
			//alert(n);
			//var m=n+1;
			var lastIndex=this.steps.length;
			this.currentStepIndex=n;
			if (this.steps[0].nl==0) {document.getElementById(0).setAttribute("class", "d-inline-block showFormula"); }
			else { document.getElementById(0).setAttribute("class", "showFormula"); }
			if (n+1 < lastIndex) {
				if (this.steps[n+1].nl==0) { document.getElementById(n+1).setAttribute("class", "d-inline-block showFormula animated zoomIn"); }
				else { document.getElementById(n+1).setAttribute("class", "showFormula animated zoomIn");}

				// A képernyőt az aktuális képletre fókuszálja
				var elmnt = document.getElementById(n);
  				elmnt.scrollIntoView();
			}
			// Eredményt zöldre festjük
			if (n+1 == lastIndex-1) {
				if (this.steps[n+1].nl==0) { document.getElementById(n+1).setAttribute("class", "d-inline-block result"); }
				else { document.getElementById(n+1).setAttribute("class", "result"); }
			}
			var elmnt = document.getElementById(n+1);
    		elmnt.scrollIntoView();

			// HELP

			var helpStep=0;

			if (this.steps[n+1].help.length > 0){
				helpStep=n;
				this.helpAvailableButton=true;
			} 
			else { 
				this.helpAvailableButton=false;
				}

			// Itt kell kivizsgálni létezik-e segítség
			if (n==helpStep+1){
				this.helpButtonClass="helpBaseContentClass animated slideOutRight"
				document.getElementById("helpButton").style.display = 'none';;
			}
		},

		showHelpContent () {
			this.helpAvailableContent=true;
			document.getElementById("helpContent").setAttribute("class", "helpBaseContentClass animated flipInY");
			document.getElementById("helpContent").style.display = 'block';;
			this.helpContentClass="helpBaseContentClass animated flipInY slow";
			this.helpAvailableButton=false;
       var audio = document.getElementById("audiohelp");
       audio.play();
		},


		hideHelpContent () {
			document.getElementById("helpContent").setAttribute("class", "helpBaseContentClass animated flipOutY");
			setTimeout(function(){ document.getElementById("helpContent").style.display = 'none';}, 1000);
			this.helpAvailableButton=false;
		},

// \Example Steps
/*
		showAllSteps () {
			if (this.steps[0].nl==0) {document.getElementById(0).setAttribute("class", "d-inline-block showFormula"); }
			else { document.getElementById(0).setAttribute("class", "showFormula"); }
			for (var i = 1; i < this.steps.length; i++) {
				if (this.steps[i].nl==0) { document.getElementById(i).setAttribute("class", "d-inline-block showFormula"); }
				else { document.getElementById(i).setAttribute("class", "showFormula");}
			}
			//	this.root.data.imgBtnAll="all0.svg";
			this.$parent.imgBtnAll="all0.svg";
			console.log(this.$parent.imgBtnAll);

		},

		hideAllSteps () {
			for (var i = 0; i < this.steps.length; i++) {
				document.getElementById(i).setAttribute("class", "hideFormula");
			}
			this.$parent.imgBtnAll="all1.svg";
		}
*/
//Show Hide All
		showAll () {

			this.showExampleStepsContainer=true;
			this.lastStepIndex;
			document.getElementById("exampleStepsContainer").style.display = "block";
			for (var i = 0; i < this.lastStepIndex; i++) {
					if (this.steps[i].nl==0) { document.getElementById(i).setAttribute("class", "d-inline-block showFormula animated zoomIn"); }
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
			for (var i = 0; i < this.lastStepIndex; i++) {
				document.getElementById(i).setAttribute("class", "hideFormula");
			}
			this.showAllBtnVisible=true;
			this.startBtnVisible=true;
			this.restartBtnVisible=false;
			this.imgBtnAll="all1.svg"
		}
// \Show Hide All
	},
	mounted () {
		this.id=this.$route.params.id;
		console.log("id: "+this.id);

		// Example Text
		axios.get('http://localhost:3000/getexample/1/hu').then(
			response => {
				const data = response.data;
				data.pageContent=data.pageContent.replace(/\\/g, '');
				data.pageContent=data.pageContent.replace(/MathML/g, 'MathML\" display=\"block');
		//		console.log(data);
				this.example=data;
			}

		
		);

		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		//this.$router.go(0);

		// Example Steps 
		let link="http://localhost:3000/getformulas/"+this.id;
		axios .get(link) .then(
			response => {
				//console.log(response);
				var steps=[];

				const data = response.data;
				//const steps = [];
				var n=0;
				for (let key in data) { 
					n++;
					const step = data[key]; 
					step.id = key; 
					step.formula=step.formula.replace(/\\/g, '');
					step.help=step.help.replace(/\\/g, '');
					step.formula=step.formula.replace(/MathML/g, 'MathML\" display=\"block');
					step.help=step.help.replace(/MathML/g, 'MathML\" display=\"block');

					if (step.nl==0) {step.class = "d-inline-block showFormula animated zoomIn";} 
					else { step.class = "showFormula animated zoomIn";}

					step.class = "hideFormula";
					steps.push(step);
				}
				this.lastStepIndex=n;
				this.steps=steps;

			}
		);
		// Solution

		axios.get('http://localhost:3000/getformula/1/9999').then(
			response => {
				const data = response.data;
				//var f=data.formula;

				data.formula=data.formula.replace(/\\/g, '');
				data.formula=data.formula.replace(/MathML/g, 'MathML\" display=\"block');
				this.exampleSolution=data;
				//this.ok=false;
			}
		
		);

	},
	components: {
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.test { background-color:blue;  }
.result {color:#009900;cursor:default;}
.mathFormulaText { font-size: 1.2em; color:#333333;cursor: pointer; }
.mathFormula { font-size: 3.4em; color:#333333;cursor: pointer; }

.showFormula { display: block; margin-top:-30px; margin-bottom:-25px }
.hideFormula { display: none; }
.marski { 
display: none; 
background:#ffb90c;
}

.showCompomnent { display: block; }
.hideComponent { display: none; }
.helpBaseButtonClass { 
	background:#ffb90c;
	padding: 20px;
	border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: #835e03;
  width:60%;
	font-size: 0.3em;
  border-width: 1px;
	margin: 10px;
	font-weight:normal;
	margin: 0 auto;
  }
.helpBaseContentClass { 
	background:#fdda94;
	padding: 20px;
	border-style: solid;
  border-width: 1px;
  border-color: #835e03;
  border-radius: 5px;
  width:60%;
	font-size: 0.3em;
  border-width: 1px;
	font-weight:normal;
	margin: 0 auto;
  }
#myProgress {
  width: 100%;
  background-color: #ddd;
}

#myBar {
  width: 1%;
  height: 5px;
  background-color: #4CAF50;
}
</style >
