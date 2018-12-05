<template>
<div class="container">
	<div class="signin">Bejelentkezve:   {{this.$store.state.signedInEmail}} / [{{this.$store.state.signedUserId}}]</div><br>
		<div class="alert alert-info bg-danger text-white"><h4>Esemény példáinak listája</h4> </div>
		<div>
          [<a  href="#" @click="goToAdminPage('adminexamplerepository')">Példák</a>]
          [<a  href="#" @click="goToAdminPage('admingrouplist',$store.state.signedInUserId)">Saját csoportok</a>]
          [<a  href="#" @click="goToAdminPage('admineventlist',$store.state.signedInUserId)">Saját események</a>]
          [<a  href="#" @click="goToAdminPage('adminexamplecart',$store.state.signedInUserId)">Példakosár</a>]
		</div>
		<div class="alert alert-info bg-success text-white">
			<h4>{{eventName}}</h4>
			[{{startTime}}] - [{{endTime}}]</h4>
		</div>

	<div class="alert alert-success" v-for="(item, index) in records"  v-bind:id="index">
		<div><div class="mousepointer"><b>{{item.idExample}}</b>
		&nbsp;<span v-on:click="deleteEventExample(item.id)" class="mathFormula"><img src="/svg/delete.svg" width=25 title="Töröl" alt="Töröl"></span>
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
			eventName:"",
			startTime:"",
			endTime:"",
			records:[],
			headers:[],
			tomi:"ttt",
			n:0
		}
	},
methods: {
		deleteEventExample(id) {
			console.log("id: "+id);
			let d = confirm("Biztosan törölni akarja?"+id);
			if (d == true) {
				let link=`http://${this.$store.state.serverhost}/eventexampledelete/${id}`;
				//axios.get(link) .then( response => { const data = response.data; console.log(response); this.$store.state.asyncCallCounter++;});
				axios.get(link) .then( response => { const data = response.data; this.$store.state.asyncCallCounter++; console.log(response); });
				console.log("Record is deleted");
				this.$store.state.asyncCallCounter++;
			} else {
				console.log("Record is not deleted");
			} 
			this.$store.state.currentMessage="Sikeres törlés!";
		},

	goToEventExampleList (id) {
			this.$router.push({ path: `/admineventexamlplelist/${id}` }) 
	},
	goToPage (id) {
			this.$router.push({ path: `/adminevent/${id}` }) 
	},

	renderEventHeader(){
		let link=`http://${this.$store.state.serverhost}/getevent/${this.$route.params.id}`;
		axios.get(link) .then(
			response => {
				const data = response.data;
				for (let key in data) { 
					this.headers.push(data[key]);
				}
				this.eventName=this.headers[0].eventName;
				this.startTime=this.headers[0].startTime;
				this.endTime=this.headers[0].endTime;
			}
		);
	},
	renderEventExampleList(){
		this.records=[];
		let link=`http://${this.$store.state.serverhost}/eventexamples/${this.$route.params.id}`;
		axios.get(link) .then(
			response => {
				const data = response.data;
				for (let key in data) { 
					this.records.push(data[key]);
				}
			}
		);

			console.log(this.records);
		//console.log("Event List Renderd");
	},
	roland () {
	//alert ("xxx");	
	this.n++;
	},

	goToAdminPage(page,id) {
		this.$router.push({ path: `/${page}` });
		if (id>=0) { this.$router.push({ path: `/${page}/${id}` }); }
	}
	},//methods
	mounted() {

		this.renderEventHeader();
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		this.renderEventExampleList();

		this.$store.watch(this.$store.getters.getAsyncCallCounter, asyncCallCounter => { 
			this.renderEventExampleList (); 
			this.message=this.$store.state.currentMessage; 
			console.log("Async Call");
		});

	}//mounted
}
</script>

<style>

</style>

