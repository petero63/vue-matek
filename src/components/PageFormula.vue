<template>
	<div class="hello" >
		<button type="button" class="btn btn-danger" v-on:click="showFormula(0)">Rejts el</button>
		<button type="button" class="btn btn-success" v-on:click="showFormula(1)">Mutasd</button>
		<br>
		<button type="button" class="btn btn-primary" v-on:click="isNight=!isNight">Rejts el 2</button>
		<div v-bind:class="(formulaClass)">
			<div v-bind:class="(formulaClass)" v-for="(item, index) in steps" v-html=item.formula v-on:click="otto(index+1)" v-bind:id="index"></div>
			<div>
			</div>
			<hr>
			<h3>Ez a json az AIP bol</h3>
		</div>

	</div>

</template>

<script>
import axios from 'axios'
export default {
	name: 'HelloWorld',
	props: {
		msgPageFormula: String
	},
	data () {
		return {
			isNight:true,
			isActive:true,
			formulaClass:"showFormula",

			steps:[],
		}
	},
	mounted () {


		//axios .get('http://localhost:3000/getformulas/1') .then(response => (this.infoajaxfull = response));
		axios .get('http://localhost:3000/getformulas/1') .then(response => {
			//console.log(response);
			var steps=[];

			const data = response.data;
			const steps = [];
			for (let key in data) { 
				const step = data[key]; 
				step.id = key; 
				step.formula=step.formula.replace(/\\/g, '');
				steps.push(step);
				//console.log(step.formula);
			}

			//console.log(steps);
			this.steps=steps;
		}
		);

		//var a={"name":"Roland","korte":145};
		var a=this.infoajaxfull;
		//axios .get('http://localhost:3000/getformula/1/110') .then(response => (this.infoajaxfull = response));
	},
	methods: {
		goHome () {var a="Rám kattintottál";alert (a);},
		showFormula (n) {
			//var a="Otto allert";alert (n);
			if (n==0) {this.formulaClass="hideFormula";}
			if (n==1) {this.formulaClass="showFormula";}

		},

		loadFormula () {
			alert("Formula is loaded.");


		},

		otto (n) {
//			alert(n);
	//		if (n==1) {this.formulaClass="showFormula";}
			var m=n+1;
			document.getElementById(m).setAttribute("class", "hideFormula");

		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.showFormula { display: block; }
.hideFormula { display: none; }
</style>
