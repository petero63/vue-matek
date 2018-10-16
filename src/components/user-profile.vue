<template>
	<div>
<h1 id="element">Hi. I'm element</h1>

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

	},
	methods: {
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style >
