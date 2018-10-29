<template>
<div v-show="showExampleStepsContainer" id="exampleStepsContainer" class="animated zoomIn">

<button type="button"  v-on:click="hideSomeSteps()" class="btn btn-warning">x Hide Some Steps</button>
exampleStepsContainer	
<div class="d-inline-block">xxx</div>
<div class="d-inline-block">yyy</div>
<div class="d-inline-block">xxx</div>
		<div class="mathFormula animated zoomIn">
			<div 
			  v-bind:class=item.class 
			  v-for="(item, index) in steps" 
			  v-html=item.formula v-on:click="nextStep(index)" 
			  v-bind:id="index"
			>
		</div>
		<div id="helpContent" v-show=helpAvailableContent class="badge helpBaseContentClass animated flipInY slow" v-on:click="hideHelpContent()" v-html=steps[currentStepIndex+1].help></div>
		<div id="helpButton" v-if="helpAvailableButton" class="badge helpBaseButtonClass animated slideInLeft" v-on:click="showHelpContent(currentSortOrder)">Segítség elérhető</div>
	</div>
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
			autoplaySpeed:1000
		}
	},
	methods: {
		otto () {
			alert("xxx "+this.steps.length);
			return this.steps.length;
		},

		hideSomeSteps () {
			alert("xxx");
			console.log("hideSomeStpes");
			document.getElementById(0).setAttribute("class", "hideFormula");
			document.getElementById(1).setAttribute("class", "hideFormula");
			document.getElementById(2).setAttribute("class", "hideFormula");
			document.getElementById(3).setAttribute("class", "hideFormula");
		},

		autoplaySolution  () {
			//this.otto(444);

			console.log("length="+this.steps.length);
			this.showExampleStepsContainer=true;
//			document.getElementById("exampleStepsContainer").style.display = "block";

	//		document.getElementById("exampleStepsContainer").style.display = "none";
			for (var i = 0; i < this.steps.lastStepIndex; i++) {
				document.getElementById(i).style.display = "none";
			}

			document.getElementById(0).setAttribute("class", "d-inline-block showFormula animated zoomIn");
			//for (var i = 1; i < this.$children[1].lastStepIndex; i++) {
			for (let i=1; i<this.lastStepIndex; i++) {

			console.log("length="+this.steps.length);
				var a="ooo";

				//this.otto(444);
		    	setTimeout( function timer(a){

					console.log("aaa="+a);
					//console.log("length="+this.steps.length);
					 var aaa=a;

					document.getElementById(i).setAttribute("class", "d-inline-block showFormula animated zoomIn");

					//this.otto(444);
					//if (this.steps[i].nl==0) { document.getElementById(i).setAttribute("class", "d-inline-block showFormula animated zoomIn"); }
					//else { document.getElementById(i).setAttribute("class", "showFormula animated zoomIn");}

					//var nnn=this.steps.length;
					//console.log("xxx="+aaa);

					var elmnt = document.getElementById(i);
	    			elmnt.scrollIntoView();
			   }, i*this.autoplaySpeed );
			}

		},

		nextStep (n) {
			//alert(n);
			var m=n+1;
			var lastIndex=this.steps.length;
			console.log("lastIndex: "+lastIndex);
//			document.getElementById(m).setAttribute("class", "d-inline-block showFormula animated zoomIn");

			if (this.steps[0].nl==0) {document.getElementById(0).setAttribute("class", "d-inline-block showFormula"); }
			else { document.getElementById(0).setAttribute("class", "showFormula"); }
			if (m < lastIndex) {
				if (this.steps[m].nl==0) { document.getElementById(m).setAttribute("class", "d-inline-block showFormula animated zoomIn"); }
				else { document.getElementById(m).setAttribute("class", "showFormula animated zoomIn");}
			}
			console.log("n: "+n);
			this.currentStepIndex=n;
			console.log("current step: "+this.currentStepIndex);
		},
		nextStepOld (n) {
			//alert(n);
			var m=n+1;
			var lastIndex=this.steps.length;
			console.log("lastIndex: "+lastIndex);

			if (this.steps[0].nl==0) {document.getElementById(0).setAttribute("class", "d-inline-block showFormula"); }
			else { document.getElementById(0).setAttribute("class", "showFormula"); }
			if (m < lastIndex) {
				if (this.steps[m].nl==0) { document.getElementById(m).setAttribute("class", "d-inline-block showFormula animated zoomIn"); }
				else { document.getElementById(m).setAttribute("class", "showFormula animated zoomIn");}
			}
			// Eredményt zöldre festjük
			if (m == lastIndex-1) {
				if (this.steps[m].nl==0) { document.getElementById(m).setAttribute("class", "d-inline-block result"); }
				else { document.getElementById(m).setAttribute("class", "result"); }
			}
			var elmnt = document.getElementById(m);
    		elmnt.scrollIntoView();

			var hs=0;
			// Itt kell kivizsgálni létezik-e segítség
			if (n==hs){
				this.helpAvailableButton=true;
			}
			if (n==hs+1){
				this.helpButtonClass="badge helpBaseContentClass animated slideOutRight"
				document.getElementById("helpButton").style.display = 'none';;
			//this.helpAvailableButton=false;

			//	console.log("itt vagyok ");
			}
			this.currentSortOrder=this.steps[n+1].sort_order;

			this.helpContent=this.steps[n+1].help;
			//this.helpContent=this.steps[n+1].formula;

			console.log("n: "+n);
			this.currentStepIndex=n;
			console.log("current step: "+this.currentStepIndex);
		},

		showHelpContent (n) {
			this.helpAvailableContent=true;
			this.helpContentClass="badge helpBaseContentClass animated flipInY slow";
			document.getElementById("helpButton").style.display = 'none';
		},


		hideHelpContent () {
			document.getElementById("helpContent").setAttribute("class", "badge helpBaseContentClass animated flipOutY");
			//document.getElementById("helpContent").style.display = 'none';;
			
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
  border-color: #835e03;
  width:60%;
	font-size: 0.3em;
  border-width: 1px;
	margin: 10px;
	font-weight:normal;
  }
.helpBaseContentClass { 
	background:#fdda94;
	padding: 20px;
	border-style: solid;
  border-width: 1px;
  border-color: #835e03;
  width:60%;
	font-size: 0.3em;
  border-width: 1px;
	margin: 10px;
	font-weight:normal;
  }
</style >
