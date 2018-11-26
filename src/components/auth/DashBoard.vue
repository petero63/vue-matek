<template>
<div>
<div class="signin">Bejelentkezve: {{this.$store.state.signedIn}}</div><br>
	<div class="alert alert-info"><h4>Vezérlőpult</h4> </div>
	<div class="alert alert-secondary" role="alert">
		<router-link to="/eventlist/4">Eseményeim</router-link>
		<router-link to="/teacher">Tanárok</router-link>
	</div>
</div>
</template>

<script>
  export default {
    data () {
      return {
      }
    }, // data
    methods: {

	 mounted() {
		this.$store.watch(this.$store.getters.getSignedIn, signedIn => { 
			console.log("Async Call");
		});
	 },
	  signIn () {
		  //alert("otto");
			this.$store.state.storeCounter=333;
			this.$store.state.idToken="dfkjasd4234KDljfsaldkx";

	  },

  } // methods
 }
</script>

<style scoped>
.signin {
	font-weight:bold;
	text-align:right;
}
</style>
