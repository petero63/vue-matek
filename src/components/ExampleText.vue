<template>
	<div>

	<h1 class="mathFormula">Pelda</h1>
	<div class="alert alert-warning"  v-html=example.pageContent ></div>
		<div class="d-inline-block"><img src="../assets/images/start.svg" width="40px"></div> 
		<div class="d-inline-block"><img src="../assets/images/solution.svg" width="40px"></div> 
		<div class="d-inline-block"><img src="../assets/images/showall.svg" width="40px"></div> 
		<div class="d-inline-block"><img src="../assets/images/theory.svg" width="40px"></div> 
	<div class="clearfix"></div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'ExampleText',
	props: { msgPageFormula: String },
	data () {
		return {
			example:"xxx",
		}
	},
	mounted () {

		axios.get('http://localhost:3000/getexample/1/hu').then(
			response => {
				const data = response.data;
				data.pageContent=data.pageContent.replace(/\\/g, '');
				console.log(data);
				this.example=data;
			}
		
		);
	},
	methods: {
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test { background-color:blue;  }
</style >
