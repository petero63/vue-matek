<template>
	<div>
<div class="signin">Bejelentkezve: {{this.$store.state.signedIn}} / {{this.$store.state.signedInEmail}}</div><br>
		<div class="alert alert-info bg-danger text-white"><h4>Adminisztráció</h4> </div>
		<ul>
			<li role="presentation"><router-link to="/adminexamplelist/9">&nbsp;Érettségi 2017 &nbsp;</router-link></li>
			<li role="presentation"><router-link to="/adminexamplelist/11">&nbsp;Érettségi 2016 &nbsp;</router-link></li>
			<li role="presentation"><router-link to="/adminexample/1">&nbsp;Example 1&nbsp;</router-link></li>
			<li role="presentation"><router-link to="/adminexample/84">&nbsp;Example 84&nbsp;</router-link></li>
			<li role="presentation"><router-link to="/adminexample/420">&nbsp;Example 420&nbsp;</router-link></li>
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
