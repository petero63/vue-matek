<template>
	<div>

		<button @click="render(id)">Render!</button>
		<div><b>Adja meg az új példa szövegét!</b></div>
		<div id="example">
			<div class="example-form">
				<!-- FORM  -->
				<form @submit.prevent="onSubmit">

					<h3>{{title}}</h3>
					<textarea id="pageContent" v-model="pageContent" class="form-control col-xs-12" rows="3" ></textarea>
					<div class="submit"> <button type="submit">Ment</button><span class="responseMessage"> {{saveMessage}} </span> </div>

				</form>
				<!-- FORM  --> 
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
			title:"",
			pageContent:"start",
			dbRecord:{pageContent:"A példa szövege!"},
			pageContent:"000",
			saveMessage: "",
			currentId:0
		}
	}, //data

	components: {

	},

	methods: {

		editExampleText(id) {
			this.pageContent=this.dbRecord.pageContent;
			//console.log(id);
			this.currentId=id;
			//console.log("currentId: "+this.currentId);
		},

		onSubmit () {

			const formData = {
				pageContent: this.pageContent,
				id: this.currentId,
				//content: this.content,
			}
			this.$store.dispatch('exampletextadd', formData)

		},

	render(id){
		//console.log("render id: "+id);
		if (id>0) {

		//console.log("render id: "+id);
		let link="http://localhost:3000/getexample/"+id+"/hu";
		//console.log("render link: "+link);
		axios.get(link).then(
			response => {
				const data = response.data;
				data.pageContent=data.pageContent.replace(/\\/g, '');
				data.pageContent=data.pageContent.replace(/MathML/g, 'MathML\" display=\"block');
				this.dbRecord=data;
			}

		);
		this.$store.asyncCallCounter++;
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		//console.log("RENDERED");
	}
	}
	}, // methods

	watch: {

	},//watch

	mounted() {
		let id=this.$route.params.id;
		console.log("id at mounted: "+id);
		//this.pageContent="zzz";

		// A store asyncCallCouter változójának fegyelése: Ha változik renderelem a táblázatot!
		this.$store.watch(this.$store.getters.getAsyncCallCounter, asyncCallCounter => { 
			this.render(id);
			//this.pageContent="Otto";

			console.log("dbRecord: "+this.dbRecord.pageContent);
			this.pageContent=this.dbRecord.pageContent;
			console.log("Async Call with id: "+id);
		});
		this.$store.state.asyncCallCounter++;
		console.log("asyncCallCounter: "+this.$store.asyncCallCounter);


		if (id>0) { 
			this.title="Példa szövegének módosítása";
			this.render(id);
			this.$store.asyncCallCounter++;
			this.pageContent="id: "+id+"pageContent "+this.dbRecord.pageContent;
		}
		console.log("id: "+id);
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
