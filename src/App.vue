<template>
	<div id="app">
		<ExampleText msgPageFormula="Page Formula Ajax API request"/>
		<ExampleSteps/>
		<ExampleSolution/>
	</div>
</template>

<script>
import axios from 'axios'
import ExampleText from './components/ExampleText.vue'
import ExampleSteps from './components/ExampleSteps.vue'
import ExampleSolution from './components/ExampleSolution.vue'

export default {
	name: 'app',
	components: {
		ExampleText,
		ExampleSteps,
		ExampleSolution
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 10px;
}
</style>
