<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png">
		<PageFormula msgPageFormula="Page Formula Ajax API request"/>
		<HelloWorld msg="x Welcome to Your Vue.js App"/>
	</div>
</template>

<script>
import axios from 'axios'
import HelloWorld from './components/HelloWorld.vue'
import PageFormula from './components/PageFormula.vue'

export default {
	name: 'app',
	components: {
		HelloWorld,
		PageFormula
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
	margin-top: 60px;
}
</style>
