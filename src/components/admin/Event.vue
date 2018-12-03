<template>
	<div>

		<div class="signin">Bejelentkezve: {{this.$store.state.signedIn}} / {{this.$store.state.signedInEmail}}</div><br>
		<div class="alert alert-info bg-danger text-white"><h4>{{pageTitle}}</h4> </div>

		<button class="btn btn-success" @click="goToPage(0)" v-show="!showForm">Saját eseményeim</button>
		<div v-show="!showForm">{{message}}</div>
		<div v-show="showForm">
		<div id="example">
			<div class="example-form">
				<!-- FORM  -->
				<form @submit.prevent="onSubmit(id)">
					Az esemény neve:
					<input id="eventName" v-model="eventName" class="form-control col-xs-12" rows="3" ><br>
					Az esemény rövid leírása:
					<textarea id="description" v-model="description" class="form-control col-xs-12" rows="3" ></textarea>
					Az esemény kezdete [2019-01-20 10:00:00] alakban:
					<input id="startTime" v-model="startTime" class="form-control col-xs-12" rows="3" ><br>
					Az esemény vége [2019-01-20 10:00:00] alakban:
					<input id="endTime" v-model="endTime" class="form-control col-xs-12" rows="3" ><br>
					Az eseményen részt vevő csoport:
					<select v-model="idGroup">
					  <option v-for="option in options" v-bind:value="option.value">{{ option.text }}</option>
					</select>
					<span>Csoport: {{ idGroup }}</span>
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
			pageTitle:"",
			message:"",
			showForm:true,
			newId:0,
			id:0,
			eventName:"",
			description:"",
			startTime:"",
			endTime:"",
			idGroup:0,
    		options: [{ text: 'Válasszon csoportot', value: 0 }, { text: 'One', value: 1 }, { text: 'Two', value: 2 }, { text: 'Three', value: 3 } ],
			idOwner:1
		}
	}, //data

	components: {

	},

	methods: {

	loadOwnGroups(){
		this.ownGropus=[];
		let link=`http://${this.$store.state.serverhost}/grouplist/${this.$store.state.signedUserId}`;
		axios.get(link) .then(
			response => {
				const data = response.data;
				for (let key in data) { 
					this.records.push(data[key]);
				}
			}
		);

		console.log("Event List Renderd");
	},

		goToPage (id) {
			this.$router.push({ path: '/admineventlist/'+id });
		},

		onSubmit (id) {
			console.log("id: "+id);

			const formData = {
				id: id,
				eventName: this.eventName,
				description: this.description,
				idOwner: this.idOwner,
				idGroup: this.idGroup,
				startTime: this.startTime,
				endTime: this.endTime,
				//content: this.content,
			}
			this.$store.dispatch('eventadd', formData)
			this.showForm=!this.showForm;
			this.message="Sikeres mentés!";

		},

	}, // methods

	watch: {

	},//watch

	mounted() {
		let id=this.$route.params.id;
		console.log("id at mounted: "+id);
		if (id>0) {

			this.pageTitle="Esemény módosítása";
			this.idGroup=2;
			
			var records=[];
			let link=`http://${this.$store.state.serverhost}/getevent/${this.$route.params.id}`;
			axios.get(link).then(
				response => {
					const data = response.data;
					for (let key in data) { records.push(data[key]);}
					this.$store.state.records=records;
					this.$store.state.asyncCallCounter++;
				}
			);

		}
		else {
			this.pageTitle="Új esemény létrehozása";
		}

		// A store asyncCallCouter változójának fegyelése: Ha változik renderelem a táblázatot!
		this.$store.watch(this.$store.getters.getAsyncCallCounter, asyncCallCounter => { 
			this.newId=this.$store.state.lastInsertedId;
			//this.showForm=!this.showForm;
			if (id>0) {
				console.log ("Async Call");
				this.id=this.$store.state.records[0].id;
				this.eventName=this.$store.state.records[0].eventName;
				this.description=this.$store.state.records[0].description;
				this.startTime=this.$store.state.records[0].startTime;
				this.endTime=this.$store.state.records[0].endTime;
				this.idGroup=this.$store.state.records[0].idGroup;
			}
			else {
				this.eventName="";
				this.description="";
				this.startTime="";
				this.endTime="";
				this.idGroup="";
			}
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
