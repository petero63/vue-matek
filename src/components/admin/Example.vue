<template>
<div>

<button @click="testIncrement()">Test Increment!</button>
<div class="alert alert-danger">Példa Adminsiztráció ID: {{$route.params.id}} ceID: {{currentExampleId}} csID: {{currentStepId}}</div>
<div id="signup">
<div class="signup-form">

<!-- FORM  -->
<form @submit.prevent="onSubmit">

<div class="input">
<label for="email">Sorszám:</label>
<input type="text" id="sortOrder" v-model="sortOrder" size=4>
</div>
<!--		  
<editor plugins="link code"  v-model="content" api-key="apiKey=d1tr83ga33vvezb16obm68acnqpxk3dlhif8hfbl9zyvszrv"></editor> 
-->

<label for="examplestep">A pálda mogoldásának követekező lépése:</label>
<textarea id="examplestep" v-model="examplestep" class="form-control col-xs-12" rows="3" ></textarea>

<label for="help">Segítésg:</label>
<textarea id="help" v-model="help" class="form-control col-xs-12" rows="2" ></textarea>
<div class="submit"> <button type="submit">Ment</button><span class="responseMessage"> {{saveMessage}} </span> </div>

</form>
<button class="btn btn-danger" @click="renderAdminTable()">Rerender!</button>
<!-- FORM  --> 
<!-- EXAMPLE TEXT  --> 
<div v-on:click="goExampleText($route.params.id)" class="mousepointer alert alert-primary mathFormulaText border-primary animated flipInY slow" v-html=example.pageContent ></div>
<!-- EXAMPLE TEXT  --> 
<!-- LIST  -->
<div class="alert alert-info" >A [{{$route.params.id}}] példa lépései [apiLocalCounter {{apiLocalCounter}}]</div>
<table class="table table-striped table-condensed">
<thead class="thead-light">
<tr>
<th scope="col">Sorszám</th>
<th scope="col">Lépés</th>
<th scope="col">Segítésg</th>
<th scope="col">Sortörés</th>
<th scope="col">Törlés</th>
</tr>
</thead>
<tbody>
<tr v-for="(item, index) in this.$store.state.steps">
<td>{{item.sort_order}}</td>
<td><div v-html=item.formula v-on:click="editStep(item.index)" class="mathFormula"></div></td>
<td v-html=item.help></td>
<td>{{item.nl}}</td>
<td><div v-on:click="deleteStep(item.id)" class="mathFormula"><img src="/svg/delete.svg" width=25 title="Töröl" alt="Töröl"></div></td>
</tr>
</tbody>
</table>
<!-- LIST  -->
</div>
</div>
</div>
</template>

<script>
import axios from 'axios'
import {VueMathjax} from 'vue-mathjax'
//store.watch( function (state) { return state.user.notifications}, console.log("xxx"););
//import Editor from '@tinymce/tinymce-vue'
//import '@tinymce/tinymce-vue/plugins/link';
//var Editor = require('@tinymce/tinymce-vue');
//var Editor = require('tinymce/tinymce-vue');
export default {
data () {
	return {
		apiLocalCounter:0,
		name: 'Flavio',
		temp:0,
		currentIndex:0,
		currentExampleId:0,
		currentStepId:0,
		currentSortOrder:'',
		currentHelp:'',
		currentFormula:'',
		currentNl:'',
		id: 0,
		sortOrder: '',
		examplestep: '',
		help: '',
		content: 'xxx',
		confirmPassword: '',
		status: null,
		terms: false,
		saveMessage: "",
		example:"",

		steps:[],
		render:0
	}
}, //data

components: {
					//	'editor': Editor
				},


methods: {
				goExampleText(id){
					this.$router.push({ path: `/adminexampletext/${id}` }) 
						console.log(id);
				},

changeName: function() {
					this.name = 'Flavius'
				},
				testIncrement () {
					//this.temp++;
					this.currentExampleId++;
					this.apiLocalCounter++;
				},

				checkSaveStatus (status) {
					if (status==200) { return "Sikeres mentés"; }
					else { return "Hiba történt! A mentés sikertelen.";}
				},

				deleteStep(id) {
					let d = confirm("Biztosan törölni akarja?");
					if (d == true) {
						let link="http://localhost:3000/examplestepdelete/"+id;
						axios.get(link) .then( response => { const data = response.data; console.log(response); });
						console.log("Record is deleted");
					} else {
						console.log("Record is not deleted");
					} 
					this.apiLocalCounter++;
					this.saveMessage="Sikeres törlés."


				},
				editStep(id) {
					this.currentStepId=this.$store.state.steps[id].id;
					this.sortOrder= this.$store.state.steps[id].sort_order;
					this.examplestep=this.$store.state.steps[id].formula;
					this.help=this.$store.state.steps[id].help;
					this.renderAdminTable ()

				},

				onSubmit () {

					const formData = {
sortOrder: this.sortOrder,
			  help: this.help,
			  examplestep: this.examplestep,
			  id: this.currentStepId,
			  id_controler: this.currentExampleId
				  //content: this.content,
					}

					this.$store.dispatch('examplestepadd', formData)
						//this.saveMessage=this.checkSaveStatus (this.$store.state.saveStatus);
						this.saveMessage=this.$store.state.saveStatus;

					//this.sortOrder=""; this.help=""; this.examplestep="";
					this.apiLocalCounter++;
					//console.log("apiCounter before: "+this.$store.state.apiCounter);
					console.log("apiLocalCounter at onSubmit: "+this.apiLocalCounter);
					this.$store.state.apiCounter++;
					//console.log("apiCounter: "+this.$store.state.apiCounter);
					//	setTimeout(this.renderAdminTable(), 1000);
					//	setInterval(console.log("aaa"), 1000);


				},

				renderAdminTable (){
					let link="http://localhost:3000/getformulas/"+this.currentExampleId;

					axios .get(link) .then(
							response => {
							//console.log(response);
							var steps=[];

							const data = response.data;
							//const steps = [];
							var n=0;
							for (let key in data) { 
							n++;
							const step = data[key]; 
							step.index=key;
							step.formula=step.formula.replace(/\\/g, '');
							step.help=step.help.replace(/\\/g, '');
							step.formula=step.formula.replace(/MathML/g, 'MathML\" display=\"block');
							step.help=step.help.replace(/MathML/g, 'MathML\" display=\"block');

							steps.push(step);
							}


							this.$store.state.steps=steps;
							//console.log(steps);
							MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
							MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

							console.log("TABLE RENDERED x");
							}
					);
				}

			}, // methods
watch: {
			 // whenever question changes, this function will run

currentExampleId: function () {
							//alert("Table rendered");
							this.renderAdminTable();
						},
currentExampleId: function () {
							//alert("Table rendered");
							this.renderAdminTable();
						},

apiLocalCounter: function () {
						  //alert("Table rendered");
						  this.renderAdminTable();
						  console.log("Changed by watch apiLocalCounter")
					  },
name: function() {
			console.log("Changed by watch")
				console.log(this.name)
		},
temp: function() {
			console.log("Changed by watch")
		}
		 },//watch

		 mounted() {

			//this.store.watch( function (state) { return state.user.notifications}, console.log("xxx"););
			 this.currentExampleId=this.$route.params.id;
			 //	this.renderAdminTable();

			let link="http://localhost:3000/getexample/"+this.$route.params.id+"/hu";
			 // Example Text
			 console.log(link);
			 axios.get(link).then(
				 response => {
					 const data = response.data;
					 data.pageContent=data.pageContent.replace(/\\/g, '');
					 data.pageContent=data.pageContent.replace(/MathML/g, 'MathML\" display=\"block');
					 this.example=data;
				 }
			 );

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

.signup-form {
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



.hobbies input {
width: 90%;
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
