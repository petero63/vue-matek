<template>
	<div class="hello">

		<p>xEz végre egy képlet az adatbázisból:</p>
		<div class="well"  v-show="isNight" v-html=aaa.body></div>
		<div>
			<button type="button" class="btn btn-danger" v-on:click="isNight=!isNight">Rejts el</button>
			<button type="button" class="btn btn-success" @click="loadFormula()">Olvasd be a képletet az adatbázisból</button>
			<p>Ez végre egy képlet az adatbázisból:</p>

			<div class="well"  v-show="isNight" v-html=formula>{{ formula }}</div>
			<div class="well"  v-show="isNight">Alma ára: {{ onedimjson.alma }} DIN</div>
		</div>
		<hr>
		<h3>Ez a json az AIP bol</h3>
		<div class="alert alert-success"  v-show="isNight"> {{ infoajaxfull.data }}</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'HelloWorld',
	props: {
		msgPageFormula: String
	},
	data () {
		return {
			isNight:true,
			infoajax: {"name":"Roland","korte":145},
			infoajaxfull: {"name":"Roland","korte":145},
			onedimjson: {"alma":100.91,"korte":145},
			formula:"sin x",
			aaa:"xxx",
		}
	},
	mounted () {


		axios
			.get('http://localhost:3000/getpost/2')
			.then(response => (this.aaa = response.data));

		//axios .get('http://localhost:3000/getformulas/1') .then(response => (this.infoajaxfull = response));
axios .get('http://localhost:3000/getformulas/1') .then(response => {
console.log(response);

}
);

		//var a={"name":"Roland","korte":145};
		var a=this.infoajaxfull;
		//axios .get('http://localhost:3000/getformula/1/110') .then(response => (this.infoajaxfull = response));
	},
	methods: {
		goHome () {var a="Rám kattintottál";alert (a);},
		otto () {var a="Otto";alert (a);},

		loadFormula () {

			//frm: {"id":"3","title":"tttt","body":"bbb"};
			axios
				.get('http://localhost:3000/getpost/2')
				.then(response => (this.formula = response.data.body));

			axios
				.get('http://localhost:3000/getformula/1/110')
				.then(response => (this.infoajax = response));



			//			this.formula="log x";
			//			this.aaa="Otto";
		}

	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
