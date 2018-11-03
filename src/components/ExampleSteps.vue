<template>
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
<div id="myProgress">
  <div id="myBar"></div>
</div>
<audio id="audiohelp" src="/helpsounds/help.mp3"></audio>
</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'ExampleSteps',
	props: [''],
	data () {
		return {
			showExampleStepsContainer:true,
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
			autoplaySpeed:2000
		}
	},
	methods: {
		playsound(){
       var audio = document.getElementById("audiohelp");
       audio.play();
		},

		autoplaySolution  () {

//			this.progressbar (10);
//			this.move (2);
			//this.otto(444);
			console.log("length="+this.steps.length);
			this.showExampleStepsContainer=true;
			for (var i = 0; i < this.steps.lastStepIndex; i++) {
				document.getElementById(i).style.display = "none";
			}

			document.getElementById(0).setAttribute("class", "d-inline-block showFormula animated zoomIn");
			//for (var i = 1; i < this.$children[1].lastStepIndex; i++) {
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
	},

	mounted () {
		axios .get('http://localhost:3000/getformulas/1') .then(
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
					//console.log(step);
				}
				this.lastStepIndex=n;
				this.steps=steps;

//				console.log(steps);
			}
		);

	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test { background-color:blue;  }
.result {color:#009900;cursor:default;}
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
