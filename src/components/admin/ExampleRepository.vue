<template>
<div>
<div class="signin">Bejelentkezve: {{this.$store.state.signedIn}} / {{this.$store.state.signedInEmail}}</div><br>
<div class="alert alert-info bg-danger text-white"><h4>Adminisztráció</h4> </div>
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
