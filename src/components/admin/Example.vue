<template>
<div>
	<div class="alert alert-danger">Példa Adminsiztráció ID: {{$route.params.id}} ceID: {{currentExampleId}} csID: {{currentStepId}}</div>
  <div id="signup">
    <div class="signup-form">

<!-- FORM  -->
      <form @submit.prevent="onSubmit">
        <div class="input">
          <input type="sortOrder" id="sortOrder" v-model="sortOrder" size=4> </div>
<!--		  
<editor plugins="link code"  v-model="content" api-key="apiKey=d1tr83ga33vvezb16obm68acnqpxk3dlhif8hfbl9zyvszrv"></editor> 
-->

<label for="examplestep">A pálda mogoldásának követekező lépése:</label>
<textarea id="examplestep" v-model="examplestep" class="form-control col-xs-12" rows="3" ></textarea>

<label for="help">Segítésg:</label>
<textarea id="help" v-model="help" class="form-control col-xs-12" rows="2" ></textarea>

<div class="submit"> <button type="submit">Ment</button><span> {{saveMessage}} </span> </div>

</form>
<!-- FORM  -->
<!-- LIST  -->
<div class="alert alert-info" >A [{{$route.params.id}}] példa lépései</div>
<table class="table table-striped table-condensed">
<thead class="thead-light">
    <tr>
      <th scope="col">Sorszám</th>
      <th scope="col">Lépés</th>
      <th scope="col">Segítésg</th>
      <th scope="col">Sortörés</th>
    </tr>
  </thead>
<tbody>
<tr v-for="(item, index) in this.$store.state.steps">
<td>{{item.sort_order}}</td>
<td><div v-html=item.formula v-on:click="editStep(item.id)" class="mathFormula"></div></td>
<td v-html=item.help></td>
<td>{{item.nl}}</td>
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
//import Editor from '@tinymce/tinymce-vue'
//import '@tinymce/tinymce-vue/plugins/link';
//var Editor = require('@tinymce/tinymce-vue');
//var Editor = require('tinymce/tinymce-vue');
  export default {
    data () {
      return {

      name: 'Flavio',
		temp:0,
        currentExampleId:0,
        currentStepId:0,
        id: 0,
        sortOrder: '',
        help: '',
        examplestep: '',
        content: 'xxx',
        confirmPassword: '',
        status: null,
        terms: false,
        saveMessage: "To Save",

			steps:[],
			render:0
      }
    }, //data

	  watch: {
		  currentExampleId: function () {
			  console.log("ooooottoo");
			  alert ("otto");
		  },
		  temp: function () {
			  console.log("Test changed");
			  //alert ("otto");
		  }
	  
	  },// watch
	components: {
	//	'editor': Editor
	},
	  

    methods: {

    changeName: function() {
      this.name = 'Flavius'
    },
		 testIncrement () {
			 //this.temp++;
			 this.currentExampleId++;
		 },

	  checkSaveStatus (status) {
		  if (status==200) { return "Sikeres mentés"; }
		  else { return "Hiba történt! A mentés sikertelen.";}
	  },
	  editStep(id) {
		  this.currentStepId=id;
			this.renderAdminTable ()

	  },
      onSubmit () {
			
        const formData = {
          sortOrder: this.sortOrder,
          help: this.help,
          examplestep: this.examplestep,
          //content: this.content,
        }
			this.sortOrder="";
			this.help="";
			this.examplestep="";

        this.$store.dispatch('examplestepadd', formData)
			//this.saveMessage=this.checkSaveStatus (this.$store.state.saveStatus);
			this.saveMessage=this.$store.state.saveStatus;
			this.render++;
			
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
					step.formula=step.formula.replace(/\\/g, '');
					step.help=step.help.replace(/\\/g, '');
					step.formula=step.formula.replace(/MathML/g, 'MathML\" display=\"block');
					step.help=step.help.replace(/MathML/g, 'MathML\" display=\"block');

					steps.push(step);
				}

			this.$store.state.steps=steps;
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
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

  	  name: function() {
     console.log("Changed by watch")
  	   console.log(this.name)
    },
  	  temp: function() {
	     console.log("Changed by watch")
    }
  },//watch

mounted() {
	this.currentExampleId=this.$route.params.id;
	this.renderAdminTable();
			} // mounted
  }
</script>

<style scoped>

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

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #8d4288;
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
