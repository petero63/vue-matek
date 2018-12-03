<template>
<div class="container">
	<div class="signin">Bejelentkezve: {{this.$store.state.signedIn}}</div><br>
		<div class="alert alert-info bg-danger text-white"><h4>Saját csoportok listája</h4> </div>


	<div class="alert alert-success mousepointer" v-for="(item, index) in records" v-on:click="goToPage(item.id)" v-bind:id="index">
	<div><b>{{item.groupName}}</b></div>
	<div> {{item.description}} </div>
	<div> Létrehozva: {{item.createdTime}} </div>
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
			this.$router.push({ path: `/admingroupmember/${id}` }) 
	},
	roland () {
	//alert ("xxx");	
	this.n++;
	}
	},//methods
	mounted() {

		let link=`http://${this.$store.state.serverhost}/grouplist/${this.$store.state.signedUserId}`;
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

