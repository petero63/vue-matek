<template>
<div class="container">

	<div class="container, gap">
		<div class="alert alert-info"><h4>Tanárok listája</h4> </div>
	</div>

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

		let link=`http://${this.$store.state.serverhost}/getusers/1`;
		axios.get(link) .then(
		//axios.get('http://localhost:3000/getusers/1') .then(
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

