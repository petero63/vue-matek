<template>
<div class="container">
		<div class="alert alert-info"><h4>Feladatok listája</h4> </div>
			<div v-for="(item, index) in steps" v-bind:id="index" >
				<div v-html=item.page_date></div>
				<div class="mousepointer alert alert-primary mathFormulaText border-primary" >
					<div ><b>{{item.exercise_book_number}}.</b></div>
					<div v-html=item.pageContent v-on:click="goToExample(item.id)"></div>
				</div>
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
			idBook:9,
			pageDate:'2017-05-09',
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
		this.idBook=this.$route.params.idBook;
		this.pageDate=this.$route.params.pageDate;

		var link=`http://${this.$store.state.serverhost}/examplelist/${this.idBook}`;
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

