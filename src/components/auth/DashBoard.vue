<template>
<div>
<div class="signin">Bejelentkezve:   {{this.$store.state.signedInEmail}} / [{{this.$store.state.signedUserId}}][{{this.$store.state.status}}]</div><br>
<div id="example-1">
</div>
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
counter:1,
			  isTeacher:false,
		}
	}, // data
methods: {
				otto (){
					this.counter++;
					this.$store.state.asyncCallCounter++;

				},

				goToAdminPage(page,id) {
					this.$router.push({ path: `/${page}` });
					if (id>=0) { this.$router.push({ path: `/${page}/${id}` }); }
				},
				goToPage(page) {
					this.$router.push({ path: `/${page}` });
				},
				signIn () {
					//alert("otto");
					this.$store.state.idToken="dfkjasd4234KDljfsaldkx";

				}
			},//methods

			mounted() {
				this.$store.state.asyncCallCounter++;
				console.log("Status: "+this.$store.state.status);
						if (this.$store.state.status==1) { this.isTeacher=true;}
						else {this.isTeacher=false;}
				// this.menu=this.$store.xdashboardMenu();

				this.$store.watch(this.$store.getters.getSignedIn, signedIn => { 
						console.log("Async Call");
						console.log("Status: "+this.$store.state.status);
						});

				this.$store.watch(this.$store.getters.getAsyncCallCounter, asyncCallCounter => { 
						console.log("Async Call");
						console.log("Status: "+this.$store.state.status);
						console.log("isTeacher: "+this.isTeacher);
						if (this.$store.state.status==1) { this.isTeacher=true;}
						else {this.isTeacher=false;}

						});
			} // mounted
}
</script>

<style>
.signin {
	font-weight:bold;
	text-align:right;
}
</style>
