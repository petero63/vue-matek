<template>
	<div class="hello">
		<hr>
		<h1>{{ msgPageFormula }}</h1>
		<h2>{{ infoajax }}</h2>
		<hr>
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
      infoajax: null
    }
	},
	mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.infoajax = response))
  }

      //.get('http://www.mathreference.org/vuetest/pageformula.php?id=208')
      //.get('https://api.coindesk.com/v1/bpi/currentprice.json')
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
