<template>
<div v-show="okToShowFirstStep" id="exampleSteps">
		<div class="mathFormula animated rollIn">
			<div 
			  v-bind:class=item.class 
			  v-for="(item, index) in steps" 
			  v-html=item.formula v-on:click="nextStep(index)" 
			  v-bind:id="index"
			>
		</div>
		<div id="helpContent" v-if="helpAvailableContent" v-bind:class="helpContentClass"v-on:click="hideHelpContent()" >Kutya füle magának :)</div>
		<div v-if="helpAvailableButton" v-bind:class="helpButtonClass" id="help" v-on:click="showHelpContent(currentStep)">Segítség elérhető</div>
	</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'ExampleSteps',
	props: ['okToShowFirstStep'],
	data () {
		return {
			helpAvailableContent:false,
			helpAvailableButton:false,
			helpcContentClass:"badge helpBaseContentClass animated flipInY slow",
			helpButtonClass:"badge helpBaseButtonClass animated slideInLeft",
			isNight:true,
			isActive:true,
			formulaClass:"showFormula ",
			steps:[],
			ok:true,
			currentStep:88
		}
	},
	mounted () {
		axios .get('http://localhost:3000/getformulas/1') .then(
			response => {
				//console.log(response);
				var steps=[];

				const data = response.data;
				//const steps = [];
				for (let key in data) { 
					const step = data[key]; 
					step.id = key; 
					step.formula=step.formula.replace(/\\/g, '');
					step.formula=step.formula.replace(/MathML/g, 'MathML\" display=\"block');
					//if (step.nl==0) {step.class = "hideFormula d-inline-block";}
					if (step.nl==0) {step.class = "hideFormula";}
					else {step.class = "hideFormula";}
					steps.push(step);
					//console.log(step);
				}
				steps[0].class="showFormula";

//				console.log(steps);
				this.steps=steps;
			}
		);

	},
	methods: {


		goHome () {var a="Rám kattintottál";alert (a);},
		showHelpContent (n) {
			//var a="Rám kattintottál: "+n;alert (a);
			this.helpAvailableContent=true;
			this.helpContentClass="badge helpBaseContentClass animated flipInY slow"
		},

		hideHelpContent () {
			//var a="Rám kattintottál: "+n;alert (a);
			//this.helpContentClass="badge helpBaseClass animated flipOutY slow"
//			this.helpContentClass="badge badge-danger"
			//this.helpAvailableContent=false;
			//document.getElementById("helpContent").setAttribute("class", "badge badge-danger");
			document.getElementById("helpContent").setAttribute("class", "badge helpBaseContentClass animated flipOutY");
//			setTimeout(this.helpAvailableContent=false, 2000);
//			setInterval(function(){ this.doHideHelpContent ();}, 3000);
			setInterval(function(){this.helpAvailableContent=false;}, 3000);
//			setInterval(function(){ alert("Hello"); }, 3000);
			//this.helpAvailableContent=false;
			console.log("Segitseg elrejt ");
		},
//		doHideHelpContent () { this.helpAvailableContent=false; },
		nextStep (n) {
			//alert(n);
			var m=n+1;
			var lastIndex=this.steps.length;
			//console.log(lastIndex);

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

			//console.log("n="+n+" nl="+this.steps[n].nl);
		//	console.log("help: "+this.steps[n].help);
			var hs=0;
		if (n==hs){
			this.helpAvailableButton=true;
		}
		if (n==hs+1){
			this.helpButtonClass="badge helpBaseContentClass animated slideOutRight"
			//this.helpAvailableButton=false;

//			console.log("itt vagyok ");
		}
//		this.currentStep=n;
//		console.log("n: "+n);
		},

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
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


.red {color:#CC0000;}
.test { background-color:blue;  }
.result {color:#009900;cursor:default;}
.mathFormula { font-size: 3.4em; color:#333333;cursor: pointer;  }
.showFormula { display: block; }

.hideFormula { display: none; }
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
