<template>
	<div>

	<div class="container, gap">
		<div class="alert alert-info"><h4>Példatár</h4> </div>
	</div>
		<ul>
			<li role="presentation"><router-link to="/examplelist/1">&nbsp;Érettségi 2016 &nbsp;</router-link></li>
			<li role="presentation"><router-link to="/examplelist/1">&nbsp;Érettségi 2017 &nbsp;</router-link></li>
			<li role="presentation"><router-link to="/examplesteps/1">&nbsp;Example 1&nbsp;</router-link></li>
			<li role="presentation"><router-link to="/examplesteps/84">&nbsp;Example 84&nbsp;</router-link></li>
			<li role="presentation"><router-link to="/examplesteps/420">&nbsp;Example 420&nbsp;</router-link></li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			name: 'Flavio'
		}
	}, //data
	methods: {
		goExampleText(){
			this.$router.push({ path: "/adminexampletext/0" }) 

		},
		changeName: function() {
			this.name = 'Flavius'
		}
	},//methods
	watch: {
		name: function() {
			//console.log("Changed by watch");
			//console.log(this.name);
		}
	}
}
</script>
