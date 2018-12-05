<template>
<div>
<div class="signin">Bejelentkezve:   {{this.$store.state.signedInEmail}} / [{{this.$store.state.signedUserId}}]</div><br>
		<div class="alert alert-info bg-danger text-white"><h4>Új csoport létrehozása</h4> </div>
		<div>
          [<a  href="#" @click="goToAdminPage('adminexamplerepository')">Példák</a>]
          [<a  href="#" @click="goToAdminPage('admingrouplist',$store.state.signedInUserId)">Saját csoportok</a>]
          [<a  href="#" @click="goToAdminPage('admineventlist',$store.state.signedInUserId)">Saját események</a>]
          [<a  href="#" @click="goToAdminPage('adminexamplecart',$store.state.signedInUserId)">Példakosár</a>]
		</div>
		<button class="btn btn-success" @click="goToPage(newId)" v-show="!showForm">Csoport tagjainak hozzáadása {{newId}}</button>
		<div v-show="showForm">

		<div>Adja meg az új csoport nevét!</div>
		<div id="example">
			<div class="example-form">
				<!-- FORM  -->
				<form @submit.prevent="onSubmit">
					<input id="groupName" v-model="groupName" class="form-control col-xs-12" rows="3" ><br>
					<textarea id="description" v-model="description" class="form-control col-xs-12" rows="3" ></textarea>
					<div class="submit"> <button type="submit">Ment</button><span class="responseMessage"></span> </div>
				</form>
				<!-- FORM  --> 
			</div>
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
			showForm:true,
			newId:0,
			groupName:"",
			description:"",
			idOwner:1
		}
	}, //data

	components: {

	},

	methods: {

		goToPage (id) {
			this.$router.push({ path: '/admingroupmember/'+id });
		},

		onSubmit () {

			const formData = {
				groupName: this.groupName,
				description: this.description,
				idOwner: this.idOwner,
				id:0 
				//content: this.content,
			}
			this.$store.dispatch('groupadd', formData)

		},

	goToAdminPage(page,id) {
		this.$router.push({ path: `/${page}` });
		if (id>=0) { this.$router.push({ path: `/${page}/${id}` }); }
	}
	}, // methods

	watch: {

	},//watch

	mounted() {
		let id=this.$route.params.id;
		console.log("id at mounted: "+id);

		// A store asyncCallCouter változójának fegyelése: Ha változik renderelem a táblázatot!
		this.$store.watch(this.$store.getters.getAsyncCallCounter, asyncCallCounter => { 
			this.newId=this.$store.state.lastInsertedId;
			this.showForm=!this.showForm;
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
