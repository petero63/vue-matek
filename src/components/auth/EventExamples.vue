<template>
<div class="container">
<div class="signin">Bejelentkezve:   {{this.$store.state.signedInEmail}} / [{{this.$store.state.signedUserId}}]</div><br>
	<div class="alert alert-info"><h4>Eseményhez tartozó példák</h4> </div>


	<div class="alert alert-success mousepointer" v-for="(item, index) in records" v-on:click="goToPage(item.idExample)" v-bind:id="index">
	<div> {{item.idExample}} </div>
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
		}
	},
methods: {

	goToPage (id) {
			this.$router.push({ path: `/examplesteps/${id}` }) 
		}
	},
	mounted() {
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		let link=`http://${this.$store.state.serverhost}/eventexamples/${this.$route.params.id}`;
		axios.get(link) .then(
			response => {
				const data = response.data;
				for (let key in data) { 
					this.records.push(data[key]);
				}
			}
		);
	}//mounted
}
</script>

<style>

</style>

