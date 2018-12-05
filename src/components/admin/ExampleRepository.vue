<template>
<div>
<div class="signin">Bejelentkezve:   {{this.$store.state.signedInEmail}} / [{{this.$store.state.signedUserId}}]</div><br>
<div class="alert alert-info bg-danger text-white"><h4>Adminisztráció</h4> </div>
		<div>
          [<a  href="#" @click="goToAdminPage('adminexamplerepository')">Példák</a>]
          [<a  href="#" @click="goToAdminPage('admingrouplist',$store.state.signedInUserId)">Saját csoportok</a>]
          [<a  href="#" @click="goToAdminPage('admineventlist',$store.state.signedInUserId)">Saját események</a>]
          [<a  href="#" @click="goToAdminPage('adminexamplecart',$store.state.signedInUserId)">Példakosár</a>]
		</div>
		<div class="alert alert-info bg-success text-white mousepointer" @click="goToAdminPage('adminexampletext',0)"><h5>Új példa létrehozása</h5> </div>
		<ul class="list-group" >
			<li class="list-group-item"><router-link to="/adminexamplelist/9">&nbsp;Érettségi 2017 &nbsp;</router-link></li>
			<li class="list-group-item"><router-link to="/adminexamplelist/11">&nbsp;Érettségi 2016 &nbsp;</router-link></li>
			<li class="list-group-item"><router-link to="/adminexample/1">&nbsp;Example 1&nbsp;</router-link></li>
			<li class="list-group-item"><router-link to="/adminexample/84">&nbsp;Example 84&nbsp;</router-link></li>
			<li class="list-group-item"><router-link to="/adminexample/420">&nbsp;Example 420&nbsp;</router-link></li>
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

	goToAdminPage(page,id) {
		this.$router.push({ path: `/${page}` });
		if (id>=0) { this.$router.push({ path: `/${page}/${id}` }); }
	},
		goExampleText(){
			this.$router.push({ path: "/adminexampletext/0" }) 

		},
		changeName: function() {
			this.name = 'Flavius'
		},

	goToAdminPage(page,id) {
		this.$router.push({ path: `/${page}` });
		if (id>=0) { this.$router.push({ path: `/${page}/${id}` }); }
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
<style>
.row-centered {
    text-align:center;
}
.adminmenu {
	border: 1px solid #000000;
	border-radius: 4px;
	color: #FFFFFF;
	background-color: #0000AA;
	padding: 4px 20px;
	margin-left: 5px;
	font: inherit;
	cursor: pointer;
}
</style>
