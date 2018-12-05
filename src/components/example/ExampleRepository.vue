<template>
	<div>

	<div v-html=this.$store.state.dashboardMenu></div>
		<div class="alert alert-info"><h4>Példatár</h4> </div>

<div class="alert alert-primary" role="alert">ÉRETTSÉGI FELADATOK</div>
<div class="alert alert-secondary" role="alert">
  <router-link to="/examplelist/9">Érettségi 2017 [május]</router-link>
</div>

<div class="alert alert-secondary" role="alert">
<router-link to="/examplelist/11">Érettségi 2016 [május]</router-link>
</div>

<div class="alert alert-primary" role="alert"> MINTAPÉLDÁK</div>
<div class="alert alert-secondary" role="alert">
<router-link to="/examplesteps/1">1. Mintapélda</router-link>
</div>

<div class="alert alert-secondary" role="alert">
<router-link to="/examplesteps/418">2. Mintapélda</router-link>
</div>

<div class="alert alert-secondary" role="alert">
<router-link to="/examplesteps/420">3. Mintapélda</router-link>
</div>

<div class="alert alert-secondary" role="alert">
<router-link to="/examplesteps/401">Mértani sorozat példa</router-link>
</div>
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
	}, //methods

	mounted(){
		this.$store.dispatch('dashboardMenu');
			//console.log("Mounted");
  }, //mouted

	watch: {
		name: function() {
			//console.log("Changed by watch");
			//console.log(this.name);
		}
	} //mouted
}
</script>
