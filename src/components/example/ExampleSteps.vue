<template>
<div>

<!-- Example Text-->

	<div class="alert alert-primary mathFormulaText border-primary animated flipInY slow" v-html=example.pageContent ></div>
<!-- Example Text-->

<!-- Example Steps-->
<h5>Megoldás menete:</h5>
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

<!-- Buttons-->
<div class="badge actionbox">

<img  v-if="startBtnVisible" src="/images/start1.svg" width="40px" @click="startSolution()" class="actionbuttons"/>
<img  v-if="restartBtnVisible"  src="/images/start0.svg" width="40px" @click="restartSolution()" class="actionbuttons"/>

<img  v-if="autoPlayBtnVisible" src="/images/autoplay.svg" width="40px" @click="autoPlaySolution()" class="actionbuttons"/>

<img v-if="showAllBtnVisible"  src="/images/all1.svg" width="40px" @click="showAll()" class="actionbuttons"/>
<img v-if="hideAllBtnVisible"  src="/images/all0.svg" width="40px" @click="hideAll()" class="actionbuttons"/>

<img v-bind:src="'/images/'+imgBtnSolution" width="40px" @click="toggleSolution()" class="actionbuttons"/>

<img v-bind:src="'/images/'+imgBtnTheory" width="40px" @click="toggleTheory()" class="actionbuttons"/>

</div>

<div v-if="speedControlVisible" >
	Automatikus lejátszás sebessége:</br>
<button type="button" class="btn btn-primary" @click="speedUp()">+</button>&nbsp;&nbsp;
<span class="d-inline-block p-3" v-html=speed></span>
&nbsp;&nbsp;<button type="button" class="btn btn-primary" @click="speedDown()">-</button>
</div>

<!-- /Buttons-->

<!-- Example Solution-->
	<div class="alert alert-success border-success animated flipInY slow" v-show="showSolutionContainer">
	<h5>Megoldás:</h5>
	<div v-html=exampleSolution.formula></div>
	</div>
<!-- Example Solution-->

<!-- Example Theory-->
	<div class="alert alert-warning border-warning animated flipInY slow" v-show="showTheoryContainer">
	<h5>Szükséges elméleti tudás:</h5>
	<div v-html=exampleTheory.formula></div>
	</div>
<!-- Example Theory-->

<!-- Footer-->
<div class="alert alert-info">
<span @click="goToPage('')" class="mousepointer">[ Címoldal ]</span>
<span @click="goToPage('examplerepository')" class="mousepointer">[ Példatár ]</span>
<span @click="goToPage('examplelist/9')" class="mousepointer">[ Érettségi 2017 ]</span>
<span @click="goToPage('examplelist/11')" class="mousepointer">[ Érettségi 2016 ]</span>

</div>
<!-- /Footer-->
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
			apObject:"",
			jj:0,
			autoPlayStep:0,
			id:1,
			counter:88,
			speedControlVisible:false,
			startBtnVisible:true,
			restartBtnVisible:false,
			autoPlayBtnVisible:true,
			showAllBtnVisible:true,
			hideAllBtnVisible:false,
			imgBtnSolution:"solution1.svg",
			imgBtnAll:"all1.svg",
			imgBtnTheory:"theory1.svg",
			showExampleStepsContainer:false,
			speed:"1.0 s",
			example:"",
			exampleSolution:"",
			exampleTheory:"",
			showExampleStepsContainer:true,
			showSolutionContainer:false,
			showTheoryContainer:false,
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

goToPage(page,id) {
	//this.$router.push({ path: '/examplesteps/'+id });
	//this.$router.push({ path: page });
	this.$router.push({ path: `/${page}` });
	if (id>0) {
	this.$router.push({ path: `/${page}/${id}` });
	}
	
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

		toggleSolution () {
			this.showSolutionContainer=!this.showSolutionContainer;
			if (this.imgBtnSolution=="solution1.svg") { this.imgBtnSolution="solution0.svg";}
			else {this.imgBtnSolution="solution1.svg";}
		},

		toggleTheory () {
			this.showTheoryContainer=!this.showTheoryContainer;
			if (this.imgBtnTheory=="theory1.svg") { this.imgBtnTheory="theory0.svg";}
			else {this.imgBtnTheory="theory1.svg";}
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

		autoPlaySolution  () {
			this.startBtnVisible=false,
			this.showAllBtnVisible=false,

			this.showProgressBar =true;
//			this.progressbar (10);
//			this.move (2);
			//this.otto(444);
			console.log("length="+this.steps.length);
			var lastStepIndex=this.steps.lastStepIndex;
			this.showExampleStepsContainer=true;
			for (var i = 0; i < this.steps.lastStepIndex; i++) {
				document.getElementById(i).style.display = "none";
			}
			var jj=4;
			console.log("jj: "+jj);

			document.getElementById(0).setAttribute("class", "d-inline-block showFormula animated zoomIn");
			//for (var i = 1; i < this.lastStepIndex; i++) {

			// ***************** AUTOPLAY  FORMULA LOOP ************************************************************
			for (let i=1; i<this.lastStepIndex; i++) {

			//this.$store.state.autoPlayStepS=77;
			console.log("length="+this.steps.length);
				var a="ooo";

			var steps=this.steps;
			var aps=this.autoplaySpeed;
				var j=0;
				this.jj=44;
				// ***************** AUTOPLAY  FORMULA ************************************************************
				var myIntervalArray=[];
		    	var myInterval=setInterval( function (){
					j++

				clearInterval (myInterval);
				console.log("j inside: "+j);
				console.log("jj: "+this.jj);
					if (j==3) {
						console.log("STOOOOOP");
		//		      clearInterval(ap);
						//clearInterval (this.ap);
					}

				//this.$store.state.autoPlayStepS=j;

					if (steps[i].nl==0) { document.getElementById(i).setAttribute("class", "d-inline-block showFormula animated zoomIn"); }
					else { document.getElementById(i).setAttribute("class", "showFormula animated zoomIn");}

					// A képernyőt az aktuális képletre fókuszálja
					var elmnt = document.getElementById(i);
	    			elmnt.scrollIntoView();
					// Bar

 			 		var elem = document.getElementById("myBar");   
				  var width = 1;
					var t=aps/100;
					
					//if (j==jj) {

					if (j==6) {
						console.log("xxxxxx: "+lastStepIndex);
						document.getElementById("myBar").style.display = "none"; 
					}

			//this.$store.state.autoPlayStepS=177;
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
				// ***************** /AUTOPLAY ************************************************************
				myIntervalArray.push.myInterval;

				//var foo = function (op) { clearInterval(ap); };

				console.log("j outside: "+j);
				//this.apObject=ap;
				console.log("xxxx i: "+i);

				//clearInterval (myInterval);
				console.log("autoPlayStep: "+this.autoPlayStep);
				if (j==3) {
				//clearInterval (ap);
				console.log("STOOOOOOOOOOOP");
				}
				console.log("autoPlayStepS: "+this.$store.state.autoPlayStepS);
			}

		// ***************** AUTOPLAY /FORMULA LOOP ************************************************************
		},

// /Autoplay Solution

		stopAutoPlay (myInterval){
			//alert("STOP");
			//console.log("MMMMM"+myInterval);
			//clearInterval (myInterval);
			//this.$router.go('/examplerepository');
			location = '/examplerepository'

		},
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
			this.autoPlayBtnVisible=false;
			this.showAllBtnVisible=false;
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
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
       var audio = document.getElementById("audiohelp");
       audio.play();
		},


		hideHelpContent () {
			document.getElementById("helpContent").setAttribute("class", "helpBaseContentClass animated flipOutY");
			setTimeout(function(){ document.getElementById("helpContent").style.display = 'none';}, 1000);
			this.helpAvailableButton=false;
		},

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
			this.hideAllBtnVisible=true;
			this.autoPlayBtnVisible=false;
		},

		hideAll (){
			this.showExampleStepsContainer=false;
			document.getElementById("exampleStepsContainer").style.display = "none";
			for (var i = 0; i < this.lastStepIndex; i++) {
				document.getElementById(i).setAttribute("class", "hideFormula");
			}
			this.showAllBtnVisible=true;
			this.startBtnVisible=true;
			this.showAllBtnVisible=true;
			this.hideAllBtnVisible=false;
			this.autoPlayBtnVisible=true;
		}
// \Show Hide All
	},
	mounted () {
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		this.id=this.$route.params.id;
		console.log("id: "+this.id);

		// Example Text
		var link=`http://${this.$store.state.serverhost}/getexample/${this.id}/hu`;
		axios.get(link).then(
		//axios.get(`http://localhost:3000/getexample/${this.id}/hu`).then(
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
		var link=`http://${this.$store.state.serverhost}/getformulas/${this.id}`;
		axios.get(link).then(
		//axios.get(`http://localhost:3000/getformulas/${this.id}`).then(
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
		var link=`http://${this.$store.state.serverhost}/getformula/${this.id}/9999`;
		axios.get(link).then(
			response => {
				const data = response.data;
				//var f=data.formula;

				data.formula=data.formula.replace(/\\/g, '');
				data.formula=data.formula.replace(/MathML/g, 'MathML\" display=\"block');
				this.exampleSolution=data;
				//this.ok=false;
			}
		
		);

		// Theory 
		var link=`http://${this.$store.state.serverhost}/getformula/${this.id}/9998`;
		axios.get(link).then(
			response => {
				const data = response.data;
				//var f=data.formula;

				data.formula=data.formula.replace(/\\/g, '');
				data.formula=data.formula.replace(/MathML/g, 'MathML\" display=\"block');
				this.exampleTheory=data;
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

.mousepointer {
cursor: pointer;
padding: 5px;
}
.solution {   }
.test { background-color:blue;  }
.result {color:#009900;cursor:default;}
.mathFormulaText { font-size: 1.5em; color:ff0000;cursor: pointer; }
.mathFormula { font-size: 2.6em; color:#333333;cursor: pointer; }
.test { font-size: 3.4em; color:#333333;cursor: pointer; }
	
#xxx { background:#ff0000; }

.showFormulax { display: block; margin-top:-30px; margin-bottom:-25px }
.showFormula { display: block; }
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
  background-color: #001eaf;
}
</style >
