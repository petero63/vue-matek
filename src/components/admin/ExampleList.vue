<template>
<div class="container">
<div class="signin">Bejelentkezve: {{this.$store.state.signedIn}} / {{this.$store.state.signedInEmail}}</div><br>
<div class="alert alert-info bg-danger text-white"><h4>Feladatok listája</h4> </div>
			<div v-for="(item, index) in steps" v-bind:id="index" >
				<div  class="p-3 mb-2 bg-info text-white mousepointer" v-on:click="addToExampleCart(item.id)"><b>{{item.id}}</b>&nbsp;&nbsp;
				<span><img src="/svg/add.svg" width=20 title="Kosárba" alt="Kosárba"></span>
				</div>
				<div class="p-3 mb-2 bg-secondary text-white" v-html=item.page_date v-on:click="editExample(item.id)"></div>
				<div class="mousepointer alert alert-primary mathFormulaText border-primary" v-html=item.pageContent v-on:click="editExample(item.id)"></div>
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

	addToExampleCart (id) {
		let d = confirm("Biztosan a kosrárba akarja tenni a példát?");
		if (d == true) {
			this.$store.state.exampleCart.push(id);
		}
	},
	editExample (id) {
		//alert(n);
		this.$router.push({ path: '/adminexample/'+id });}
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

