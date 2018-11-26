<template>
<div class="container">
	<div class="signin">Bejelentkezve: {{this.$store.state.signedIn}}</div><br>
	<div class="alert alert-info"><h4>Eseményeim</h4> </div>


	<div class="alert alert-success mousepointer" v-for="(item, index) in records" v-on:click="goToPage(item.id)" v-bind:id="index">
	<div> {{item.eventName}} </div>
	<div> Iddőpont: {{item.description}} </div>
	<div> {{item.startTime}} - {{item.endTime}} </div>
	</div>
</div>

</template>

<script>

import axios from 'axios'
export default {
	data() {
		return {
			records:[],
			tomi:"ttt",
			n:0
		}
	},
methods: {

	goToPage (id) {
			this.$router.push({ path: `/eventexamples/${id}` }) 
	},
	roland () {
	//alert ("xxx");	
	this.n++;
	}
	},//methods
	mounted() {

		let link=`http://${this.$store.state.serverhost}/eventlist/${this.$route.params.id}`;
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

