<template>
<div class="container">
<div class="alert alert-info">Feladatok listája</div>
			<div v-for="(item, index) in steps" v-bind:id="index" >
				<div v-html=item.page_date v-on:click="editExample(item.id)"></div>
				<div class="mousepointer alert alert-primary mathFormulaText border-primary animated flipInY slow" v-html=item.pageContent v-on:click="editExample(item.id)"></div>
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

		editExample (id) {
			//alert(n);
			this.$router.push({ path: '/adminexample/'+id });
			}
			},
mounted() {

		let link=`http://${this.$store.state.serverhost}/examplelist/9`;
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

			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			}

}
</script>

<style>
.mousepointer {
cursor: pointer;
}
</style>

