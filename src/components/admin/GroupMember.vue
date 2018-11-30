<template>
	<div>

		<div class="signin">Bejelentkezve: {{this.$store.state.signedIn}} / {{this.$store.state.signedInEmail}}</div><br>
		<div class="alert alert-info bg-danger text-white"><h4>Új csoport tag hozzáadása</h4> </div>
		<div class="alert alert-info bg-info text-white">[{{($route.params.id)}}] {{this.groupName}}</div>

		<div>

		<div>Adja meg az új tag e-mail címét!</div>
		<div id="example">
			<div class="example-form">
				<!-- FORM  -->
				<form @submit.prevent="onSubmit">
					<input id="email" v-model="email" class="form-control col-xs-12" rows="3" ><br>
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
			newId:0,
			groupName:"",
			email:"",
		}
	}, //data

	components: {

	},

	methods: {

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

	}, // methods

	watch: {

	},//watch

	mounted() {

		let link="http://"+this.$store.state.serverhost+"/getgroupname/"+this.$route.params.id;
		// Example Text
		axios.get(link).then(
			response => {
				const data = response.data;
				this.groupName=data[0].groupName;
				console.log(data[0].groupName);
				//console.log(data.groupName);

				this.groupName=data[0].groupName;
			}
		);


		let id=this.$route.params.id;
		console.log("id at mounted: "+id);

		// A store asyncCallCouter változójának fegyelése: Ha változik renderelem a táblázatot!
		this.$store.watch(this.$store.getters.getAsyncCallCounter, asyncCallCounter => { 
			this.newId=this.$store.state.lastInsertedId;
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
