<template>
<div class="container">
<div class="alert alert-info">Feladatok listája</div>
			<div v-for="(item, index) in steps" v-bind:id="index" >
				<div v-html=item.page_date v-on:click="nextStep(index)"></div>
				<div class="mousepointer alert alert-primary mathFormulaText border-primary animated flipInY slow" v-html=item.pageContent v-on:click="nextStep(index)"></div>
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

		nextStep (n) {
			alert(n);
			}
			},
mounted() {

		let link=`http://${this.$store.state.serverhost}/examplelist/9`;
		axios.get(link) .then(
		//axios.get('http://localhost:3000/examplelist/9') .then(
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

