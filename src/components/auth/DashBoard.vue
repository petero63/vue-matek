<template>
<div>
<div class="signin">Bejelentkezve:   {{this.$store.state.signedInEmail}} / [{{this.$store.state.signedUserId}}]</div><br>
	<div class="alert alert-info"><h4>Vezérlőpult</h4> </div>
		<div v-show="isTeacher">
          [<a  href="#" @click="goToAdminPage('adminexamplerepository')">Példák</a>]
          [<a  href="#" @click="goToAdminPage('admingrouplist',$store.state.signedInUserId)">Saját csoportok</a>]
          [<a  href="#" @click="goToAdminPage('admineventlist',$store.state.signedInUserId)">Saját események</a>]
          [<a  href="#" @click="goToAdminPage('adminexamplecart',$store.state.signedInUserId)">Példakosár</a>]
		</div>
		<div v-show="!isTeacher">
          [<a  href="#" @click="goToPage('eventlist')">Saját csoportok</a>]
		</div>
</div>
</template>

<script>
  export default {
    data () {
      return {
		 	isTeacher:false,
      }
    }, // data
    methods: {

		goToAdminPage(page,id) {
			this.$router.push({ path: `/${page}` });
			if (id>=0) { this.$router.push({ path: `/${page}/${id}` }); }
		},
		goToPage(page) {
			this.$router.push({ path: `/${page}` });
		},
	  signIn () {
		  //alert("otto");
			this.$store.state.storeCounter=333;
			this.$store.state.idToken="dfkjasd4234KDljfsaldkx";

	  },

	 mounted() {

			console.log("Status: "+this.$store.state.status);
		// this.menu=this.$store.xdashboardMenu();
		this.$store.dispatch('dashboardMenu');

		this.$store.watch(this.$store.getters.getSignedIn, signedIn => { 
			console.log("Async Call");

		 if (this.$store.state.status==1) { this.isTeacher=true;}
		 else {this.isTeacher=false;}
		});
	 }
  } // methods
 }
</script>

<style>
.signin {
	font-weight:bold;
	text-align:right;
}
</style>
