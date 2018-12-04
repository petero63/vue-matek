<template>
<div class="container">
	<div class="signin">Bejelentkezve: {{this.$store.state.signedIn}}</div><br>
		<div class="alert alert-info bg-danger text-white"><h4>Példakosár tartalma</h4> </div>

	<div class="alert alert-success" v-for="(item, index) in records"  v-bind:id="index">
		<div><div class="mousepointer"><b>{{item.id}}</b>
		&nbsp;<span v-on:click="deleteExampCartItem(item.id)" class="mathFormula"><img src="/svg/delete.svg" width=25 title="Töröl" alt="Töröl"></span>
			</div>
</div>
	<div v-html=item.pageContent></div>
	</div>
</div>

</template>

<script>

import axios from 'axios'

export default {
	data() {
		return {
			records:[],
			n:0
		}
	},
methods: {
		deleteExampCartItem(id) {
			let d = confirm("Biztosan törölni akarja?");
			if (d == true) {
				let index = this.$store.state.exampleCart.indexOf(id);
				console.log("index: "+index);
				this.$store.state.exampleCart.splice(index, 1);
			}
			console.log("exampleCart"+this.$store.state.exampleCart);
		},

	goToEventExampleList (id) {
			this.$router.push({ path: `/admineventexamlplelist/${id}` }) 
	},
	goToPage (id) {
			this.$router.push({ path: `/adminevent/${id}` }) 
	},

	renderExampleCart(){
			this.records=[];
			const formData={exampleCart:this.$store.state.exampleCart};
			this.$store.dispatch('examplecart', formData)
			this.records=this.$store.state.exampleCartRecords;
	},
	roland () {
	//alert ("xxx");	
	this.n++;
	}
	},//methods
	mounted() {

		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		this.renderExampleCart();

		this.$store.watch(this.$store.getters.getAsyncCallCounter, asyncCallCounter => { 
			//this.renderExampleCart();
			this.message=this.$store.state.currentMessage; 
			console.log("Async Call");
		});

		this.$store.watch(this.$store.getters.getExampleCart, getExampleCart => { 
			this.renderExampleCart();
			this.message=this.$store.state.currentMessage; 
			console.log("Example Cart Change");
		});
	}//mounted
}
</script>

<style>

</style>

