<template>
<div class="container">
<div class="alert alert-info">Feladatok listája</div>
			<div v-for="(item, index) in steps" v-bind:id="index" >
				<div v-html=item.page_date></div>
				<div class="mousepointer alert alert-primary mathFormulaText border-primary" v-html=item.pageContent v-on:click="goToExample(item.id)"></div>
		</div>
</div>

</template>

<script>

import axios from 'axios'

//require('dotenv').load();
import dotenv from 'dotenv'
dotenv.config()
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

		var link=`http://${this.$store.state.serverhost}/examplelist/9`;
		axios.get(link) .then(
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

	console.log("dotenv: "+process.env.DBHOST);
console.log("xxx "+process.env)
			}

}
</script>

<style>
.mousepointer {
cursor: pointer;
}
</style>

