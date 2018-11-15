<template>
	<div>

		<div id="example">
			<div class="example-form">

				<!-- FORM  -->
				<form @submit.prevent="onSubmit">

					<label for="examplestep">A pálda szövege:</label>
					<textarea id="pageContent" v-model="pageContent" class="form-control col-xs-12" rows="3" ></textarea>
					<div class="submit"> <button type="submit">Ment</button><span class="responseMessage"> {{saveMessage}} </span> </div>

				</form>
				<!-- FORM  --> 
				<!-- EXAMPLE TEXT  --> 
	<div v-on:click="editExampleText(1)" class="mousepointer alert alert-primary mathFormulaText border-primary animated flipInY slow" v-html=exampleText.pageContent ></div>
				<!-- EXAMPLE TEXT  --> 
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
			exampleText:"",
			pageContent:"",
			saveMessage: "",
			currentId:1
		}
	}, //data

	components: {

	},

	methods: {

		editExampleText(id) {
			this.pageContent=this.exampleText.pageContent;
			console.log(id);

		},

		onSubmit () {

			const formData = {
				pageContent: this.pageContent,
				id: this.currentId,
				//content: this.content,
			}
			this.$store.dispatch('exampletextadd', formData)

		},
	}, // methods
	watch: {

	},//watch

	mounted() {

		// Example Text
		axios.get('http://localhost:3000/getexample/1/hu').then(
			response => {
				const data = response.data;
				data.pageContent=data.pageContent.replace(/\\/g, '');
				data.pageContent=data.pageContent.replace(/MathML/g, 'MathML\" display=\"block');
				this.exampleText=data;
			}

		);

		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

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
