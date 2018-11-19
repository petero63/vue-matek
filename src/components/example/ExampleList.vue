<template>
<div class="container">
<div class="alert alert-info">Feladatok listája</div>
			<div v-for="(item, index) in steps" v-bind:id="index" >
				<div v-html=item.page_date></div>
				<div class="mousepointer alert alert-primary mathFormulaText border-primary animated flipInY slow" v-html=item.pageContent v-on:click="goToExample(item.id)"></div>
		</div>
</div>

</template>

<script>

import axios from 'axios'
export default {
	data() {
		return {
			steps:[],
		}
	},
methods: {

		goToExample (id) {
			this.$router.push({ path: '/examplesteps/'+id });
			}
			},
mounted() {

		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		//axios.get('http://localhost:3000/examplelist/9') .then(
		axios.get('http://www.knxplaza.com/api/examplelist/9') .then(
			response => {
				//console.log(response);
				var steps=[];

				const data = response.data;
				//const steps = [];
				var n=0;
				for (let key in data) { 
					n++;
					const step = data[key]; 
					steps.push(step);
				}
				this.steps=steps;
				console.log(this.steps);

			}
		);
			}

}
</script>

<style>
.mousepointer {
cursor: pointer;
}
</style>

