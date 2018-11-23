<template>
	<div id="signin">

		<div class="alert alert-success" v-show=this.$store.state.signedIn><h4>Sikeres bejelentkezés</h4> </div>
		<div class="alert alert-info" v-show=!this.$store.state.signedIn><h4>Az oldal megtekintéséhez be kell jelentkezni!</h4> </div>

		<div class="alert alert-danger"><h4>token: [{{this.$store.state.idToken}}] signedIn: [{{this.$store.state.signedIn}}]</h4> </div>

		<div class="container, gap" v-show=!this.$store.state.signedIn>
			<button type="button" class="btn btn-primary" @click="signIn()">SignIn</button>
			<button type="button" class="btn btn-primary" @click="xxx()">Read Store</button>

			<div class="signin-form">
				<form @submit.prevent="onSubmit">
					<div class="input">
						<label for="email">Mail</label>
						<input
				 type="email"
	  id="email"
	v-model="email">
					</div>

					<div class="input">
						<label for="password">Password</label>
						<input
				 type="password"
	  id="password"
	v-model="password">
					</div>

					<div class="submit">
						<button type="submit">Bejelentkezés</button>
					</div>
				</form>

			</div>
		</div>
	</div>
</template>

<script>
  export default {
    data () {
      return {
			signedIn:false,
		title: 'Az oldal megtekintéséhez be kell jelentkeznie!',
        showSignInForm: true,
        email: '',
        password: ''
      }
    },
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

	  xxx () {
		  //alert("otto");
			console.log("idToken: "+this.$store.state.idToken);
			console.log("xxx: "+this.$store.state.xxx);
	  },
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
        }
        console.log(formData)
		  //alert("xxx");
        this.$store.dispatch('signin', {email: formData.email, password: formData.password})
			//if (formData.email==formData.password) {
			if (this.$store.state.singedIn) {
				//this.$store.state.idToken="dfkjasd4234KDljfsaldkx";
				this.title="Sikeres bejelentkezés";
				this.showSignInForm=false;
				console.log("SIKER");
			}
			if (this.$store.state.singedIn) {
				this.title="Sikertelen bejelentkezés";
				console.log("KUDARC");
			}

        console.log("signedIn: "+this.$store.state.singedIn)
			//else { this.title="Sikertelen bejelentkezés"; }
      }
    }
  }
</script>

<style scoped>
  .signin-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>
