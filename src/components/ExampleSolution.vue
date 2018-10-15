<template>
	<div>
	<div class="alert alert-success"  v-html=example.pageContent ></div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'ExampleSolution',
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
//				console.log(data);
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
