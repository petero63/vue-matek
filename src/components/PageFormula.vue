<template>
<div class="hello">
<div>
<button type="button" class="btn btn-success" v-on:click="isNight=!isNight">Rejts el</button>
<button type="button" class="btn btn-success" @click="goHome()">Kattints rám</button>
<div class="well"  v-show="isNight">Alma ára: {{ onedimjson.alma }} DIN</div>
<p>Körte ára: {{ onedimjson.korte }} DIN</p>
</div>
<hr>
<p>xxx {{ msgPageFormula }}</p>
<h3>Ez a json az AIP bol</h3>
<hr>
<p>{{ infoajax}}</p>
<hr>
</div>
</template>

<script>
import axios from 'axios'
function otto() { alert("ok"); }
export default {
name: 'HelloWorld',
			props: {
msgPageFormula: String
			},
			data () {
				return {
					isNight:true,
infoajax: {"name":"Roland","korte":145},
			 onedimjson: {"alma":100.91,"korte":145},
				}
			},
			mounted () {
				axios
					.get('http://localhost:3000')
					.then(response => (this.infoajax = response))
			},
			methods: {
				goHome () {var a="Rám kattintottál";alert (a);}

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
