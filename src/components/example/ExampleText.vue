<template>
	<div>
	<h1 class="mathFormula ">Példa</h1>
	<div class="alert alert-primary mathFormula border-primary" v-html=example.pageContent ></div>
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
			showall:"showall1.svg",
			imgbtn:"solution1.svg"
		}
	},
	mounted () {

		axios.get('http://localhost:3000/getexample/1/hu').then(
			response => {
				const data = response.data;
				data.pageContent=data.pageContent.replace(/\\/g, '');
				data.pageContent=data.pageContent.replace(/MathML/g, 'MathML\" display=\"block');
		//		console.log(data);
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
.mathFormula { font-size: 20px; color:#333333;cursor: pointer;  }
</style >
