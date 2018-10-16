<template>
<div v-show="ok">
<div class="mathFormula d-inline-block ">
		<div v-bind:class="(formulaClass)">
			<div 
			v-bind:class=item.class 
			v-for="(item, index) in steps" 
			v-html=item.formula v-on:click="nextStep(index)" 
			v-bind:id="index">
			</div>
			<div>
			</div>
		</div>
</div>
</div>

</template>

<script>
import axios from 'axios'
export default {
	name: 'ExampleSteps',
	props: {
		msgPageFormula: String
	},
	data () {
		return {
			example:"xxx",
			isNight:true,
			isActive:true,
			formulaClass:"showFormula ",
			steps:[],
			ok:true
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
					step.class = "hideFormula"; 
					steps.push(step);
				}
				steps[0].class="showFormula";

	//			console.log(steps);
				this.steps=steps;
		}
		);
		
	},
	methods: {
		goHome () {var a="Rám kattintottál";alert (a);},
		showFormula (n) {

	//		var a="Otto allert";alert (n);
			if (n==0) {this.formulaClass="hideFormula";}
			if (n==1) {this.formulaClass="showFormula";}

		},

		loadFormula () {
			alert("Formula is loaded.");


		},

		nextStep (n) {
			//alert(n);
			var m=n+1;
			document.getElementById(m).setAttribute("class", "shoFormula d-inline-block");

		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test { background-color:blue;  }
.mathFormula { font-size: 20px; color:#333333;cursor: pointer;  }
.showFormula { display: block; }
.hideFormula { display: none; }
.showCompomnent { display: block; }
.hideComponent { display: none; }
</style >
