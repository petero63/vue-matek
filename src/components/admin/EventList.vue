<template>
<div class="container">
	<div class="signin">Bejelentkezve: {{this.$store.state.signedIn}}</div><br>
		<div class="alert alert-info bg-danger text-white"><h4>Saját események listája</h4> </div>


	<div class="alert alert-success" v-for="(item, index) in records"  v-bind:id="index">
		<div><div v-on:click="goToPage(item.id)" class="mousepointer"><b>{{item.eventName}}</b></div>[{{item.startTime}}] -  [{{item.endTime}}] &nbsp;&nbsp;<span v-on:click="deleteEvent(item.id)" class="mathFormula"><img src="/svg/delete.svg" width=25 title="Töröl" alt="Töröl"></span>
</div>
	<div> {{item.description}} </div>
	<div> Csoport: {{item.groupName}} </div>
	<div> Létrehozva: {{item.createdTime}} </div>
	<div class="mousepointer" v-on:click="goToEventExampleList(item.id)"><b>Hozzárendelt példák</b></div>
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
		deleteEvent(id) {
			let d = confirm("Biztosan törölni akarja?");
			if (d == true) {
				let link=`http://${this.$store.state.serverhost}/eventdelete/${id}`;
				axios.get(link) .then( response => { const data = response.data; console.log(response); this.$store.state.asyncCallCounter++;});
				console.log("Record is deleted");
				
			} else {
				console.log("Record is not deleted");
			} 
			this.$store.state.currentMessage="Sikeres törlés!";
		},

	goToEventExampleList (id) {
			this.$router.push({ path: `/admineventexamplelist/${id}` }) 
	},
	goToPage (id) {
			this.$router.push({ path: `/adminevent/${id}` }) 
	},
	renderEventList(){
		this.records=[];
		let link=`http://${this.$store.state.serverhost}/eventlist/${this.$store.state.signedUserId}`;
		axios.get(link) .then(
			response => {
				const data = response.data;
				for (let key in data) { 
					this.records.push(data[key]);
				}
			}
		);

		//console.log("Event List Renderd");
	},
	roland () {
	//alert ("xxx");	
	this.n++;
	}
	},//methods
	mounted() {

		this.renderEventList();

		// A store asyncCallCouter változójának fegyelése: Ha változik renderelem a táblázatot!
		this.$store.watch(this.$store.getters.getAsyncCallCounter, asyncCallCounter => { 
		//	this.newId=this.$store.state.lastInsertedId;
			this.renderEventList (); 
			this.message=this.$store.state.currentMessage; 
		});

	}//mounted
}
</script>

<style>

</style>

