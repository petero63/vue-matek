<template>
<div>
<div class="signin">Bejelentkezve:   {{this.$store.state.signedInEmail}} / [{{this.$store.state.signedUserId}}]</div><br>
		<div class="alert alert-info bg-info text-white">[{{($route.params.id)}}] {{this.groupName}}</div>
		<div>
          [<a  href="#" @click="goToAdminPage('adminexamplerepository')">Példák</a>]
          [<a  href="#" @click="goToAdminPage('admingrouplist',$store.state.signedInUserId)">Saját csoportok</a>]
          [<a  href="#" @click="goToAdminPage('admineventlist',$store.state.signedInUserId)">Saját események</a>]
          [<a  href="#" @click="goToAdminPage('adminexamplecart',$store.state.signedInUserId)">Példakosár</a>]
		</div>
		<div>

		<div>Adja meg az új tag e-mail címét!</div>
			<div class="example-form">
				<!-- FORM  -->
				<form @submit.prevent="onSubmit">
					<input id="email" v-model="email" class="form-control col-xs-12" rows="3" ><br>
					<div class="submit"> <button type="submit">Hozzáad</button><span class="responseMessage"></span> </div>
					<div>{{message}}</div>
				</form>
				<!-- FORM  --> 
			</div>
		</div>
<h2>Eddigi csoporttagok</h2>

	<div class="alert alert-success" v-for="(item, index) in records" v-bind:id="index">

	<div>
		<b>{{item.lastname}} {{item.firstname}}</b> / {{item.email}}
	<span v-on:click="deleteMember(item.id)" class="mathFormula"><img src="/svg/delete.svg" width=25 title="Töröl" alt="Töröl"> </span>
	
	</div>
	</div>

</div>
</template>

<script>
import axios from 'axios'
import {VueMathjax} from 'vue-mathjax'
export default {
	data () {
		return {
			message:"",
			newId:0,
			groupName:"",
			email:"",
			records:[],
		}
	}, //data

	components: {

	},

	methods: {
		deleteMember(id) {
			let d = confirm("Biztosan törölni akarja?");
			if (d == true) {
				//let link="http://"+this.$store.state.serverhost+"/memberdelete/"+id;
				let link=`http://${this.$store.state.serverhost}/memberdelete/${id}`;
				axios.get(link) .then( response => { const data = response.data; this.$store.state.asyncCallCounter++; console.log(response); });

				
				console.log("Record is deleted");
			} else {
				console.log("Record is not deleted");
			} 
			this.$store.state.currentMessage="Sikeres törlés!";


		},

		goToPage (id) {
			this.$router.push({ path: '/groupmembers/'+id });
		},

		onSubmit () {

			const formData = {
				email: this.email,
				id:this.$route.params.id 
			}
			this.$store.dispatch('groupmemberadd', formData)

		},
		renderGroupMembers () {
			
			this.records=[];
			let linkGM=`http://${this.$store.state.serverhost}/groupmembers/${this.$route.params.id}`;
			axios.get(linkGM).then(
				response => {
					const data = response.data;
					for (let key in data) { 
						this.records.push(data[key]);
					}
				}
			);
		},

	goToAdminPage(page,id) {
		this.$router.push({ path: `/${page}` });
		if (id>=0) { this.$router.push({ path: `/${page}/${id}` }); }
	}
	}, // methods

	watch: {

	},//watch

	mounted() {

		// Group Name 
		let linkGN=`http://${this.$store.state.serverhost}/getgroupname/${this.$route.params.id}`;
		axios.get(linkGN).then(
			response => {
				const data = response.data;
				this.groupName=data[0].groupName;
				//console.log(data[0].groupName);
				//console.log(data.groupName);

				this.groupName=data[0].groupName;
			}
		);

		// Group Members 
		this.renderGroupMembers (); 

		let id=this.$route.params.id;
		console.log("id at mounted: "+id);

		// A store asyncCallCouter változójának fegyelése: Ha változik renderelem a táblázatot!
		this.$store.watch(this.$store.getters.getAsyncCallCounter, asyncCallCounter => { 
			this.newId=this.$store.state.lastInsertedId;
			this.renderGroupMembers (); 
			this.message=this.$store.state.currentMessage; 
		});

	} // mounted
}
</script>

<style scoped>
.mousepointer {
cursor: pointer;
}

.responseMessage {
	color: #aa0000;
	font-size: 1.0em;
}
.mathFormula {cursor: pointer;}

.example-form {
	margin: 30px auto;
	border: 1px solid #eee;
	padding: 20px;
	box-shadow: 0 2px 3px #ccc;
}

.input {
	margin: 10px auto;
}

.input label {
	display: block;
	color: #4e4e4e;
	margin-bottom: 6px;
}

.input.inline label {
	display: inline;
}

.input input {
	font: inherit;
	width: 100%;
	padding: 6px 12px;
	box-sizing: border-box;
	border: 1px solid #ccc;
}

.input.inline input {
	width: auto;
}

.input input:focus {
	outline: none;
	border: 1px solid #521751;
	background-color: #eee;
}


.submit button {
	border: 1px solid #521751;
	color: #521751;
	padding: 10px 20px;
	font: inherit;
	cursor: pointer;
}

.submit button:hover,
.submit button:active {
	background-color: #521751;
	color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
	border: 1px solid #ccc;
	background-color: transparent;
	color: #ccc;
	cursor: not-allowed;
}
</style>
