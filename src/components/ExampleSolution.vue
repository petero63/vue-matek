<template>
<div v-show="okToShowSolution" id="solution">

<div class="mathFormulaSolution animated flipInY slow">
	<div class="alert alert-success border-success">
	<h5>Megodldás:</h5>
	<div v-html=example.formula></div>
	</div>
	</div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	name: 'ExampleSolution',
	props: ['okToShowSolution'],
	data () {
		return {
			example:"xxx",
			ok:"false"
		}
	},

	methods: {
		formulaDisplayBlock (f) {
			f=f.replace(/\\/g, '');
			f=f.replace(/MathML/g, 'MathML\" display=\"block');
			return f
		}
	},
	mounted () {

		axios.get('http://localhost:3000/getformula/1/9999').then(
			response => {
				const data = response.data;
				//var f=data.formula;

				data.formula=data.formula.replace(/\\/g, '');
				data.formula=data.formula.replace(/MathML/g, 'MathML\" display=\"block');
				this.example=data;
				//this.ok=false;
			}
		
		);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test { background-color:blue;  }
.mathFormulaSolution { font-size: 1.4em; color:#333333; margin-top: 0}
</style >
