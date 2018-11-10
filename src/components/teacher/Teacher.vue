<template>
<div class="container">
<div class="alert alert-info">Tanárok listája</div>

			<div 
			  v-for="(item, index) in steps" 
			  v-html=item.email v-on:click="nextStep(index)" 
			  v-bind:id="index"
			>
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
		axios.get('http://localhost:3000/getusers/1') .then(
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

</style>

