<template>
	<div>

	<h1 class="mathFormula">Pelda</h1>
	<div class="alert alert-warning"  v-html=example.pageContent ></div>
<img v-bind:src="'/images/'+imgbtn" width="40px" @click="showSolution()"/>
<hr>
		<div class="d-inline-block"> </div> 
		<div class="d-inline-block"><img src="/images/start1.svg" width="40px"></div> 
		<div class="d-inline-block"><img src="/images/solution1.svg" width="40px"></div> 
		<div class="d-inline-block"><img src="/images/showall1.svg" width="40px"></div> 
		<div class="d-inline-block"><img src="/images/theory1.svg" width="40px"></div> 
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
			showall:"showall1.svg",
			imgbtn:"solution1.svg"
		}
	},
	mounted () {

		axios.get('http://localhost:3000/getexample/1/hu').then(
			response => {
				const data = response.data;
				data.pageContent=data.pageContent.replace(/\\/g, '');
		//		console.log(data);
				this.example=data;
			}
		
		);
	},
	methods: {
		showSolution () {
			if (this.imgbtn=="solution1.svg") { console.log("aaa");this.imgbtn="solution0.svg";console.log(this.imgbtn);}
			else { console.log("bbb");this.imgbtn="solution1.svg";console.log(this.imgbtn);}
			}
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test { background-color:blue;  }
</style >
