<template>
	<div>
	<div class="d-inline-block  bg-success" >xxxx </div>
	<div class="d-inline-block  bg-warning" >yyy </div>
	<div class="d-inline-block  bg-success" >zzz </div>
	<h1 class="mathFormula">Pelda</h1>
	<div class="alert alert-success"  v-html=example.pageContent ></div>
		<button type="button" class="btn btn-danger" v-on:click="showFormula(0)">Rejts el</button>
		<button type="button" class="btn btn-success" v-on:click="showFormula(1)">Mutasd</button>
		<br>
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
			<hr>
			<h3>Ez a json az AIP bol</h3>
		</div>
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
			example:"xxx",
			isNight:true,
			isActive:true,
			formulaClass:"showFormula ",
			steps:[],
		}
	},
	mounted () {


		//axios .get('http://localhost:3000/getformulas/1') .then(response => (this.infoajaxfull = response));
		axios .get('http://localhost:3000/getformulas/1') .then(response => {
			//console.log(response);
			var steps=[];

			const data = response.data;
			//const steps = [];
			for (let key in data) { 
				const step = data[key]; 
				step.id = key; 
				step.formula=step.formula.replace(/\\/g, '');
				step.class = "hideFormula"; 
				steps.push(step);
			}
			steps[0].class="showFormula";

//			console.log(steps);
			this.steps=steps;


		}
		);

		//axios .get('http://localhost:3000/getformula/1/110') .then(response => (this.infoajaxfull = response));
		axios .get('http://localhost:3000/getexample/1/hu') .then(response => {
			const data = response.data;

				data.pageContent=data.pageContent.replace(/\\/g, '');
			console.log(data);
			this.example=data;
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
</style >
