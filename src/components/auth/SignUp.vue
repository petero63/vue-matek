<template>
<div>
	<div class="container, gap">
		<div class="alert alert-info"><h4>Regisztráció</h4> </div>
	</div>

		<div v-show=showSignUpSuccess>
			<h4>Sikeres regisztráció</h4> 
		<button type="button" class="btn btn-primary" @click="goToPage('dashboard')">Vezérlőpult</button>
		</div>
  <div id="signup" >
    <div class="signup-form" v-show=!showSignUpSuccess>
      <form @submit.prevent="onSubmit" >
        <div class="input">
          <label for="email">E-mail</label>
          <input
                  type="email"
                  id="email"
                  v-model="email">
        </div>
        <div class="input">
          <label for="password">Jelszó</label>
          <input
                  type="password"
                  id="password"
                  v-model="password">
        </div>
        <div class="input">
          <label for="confirm-password">Megismételt jelszó</label>
          <input
                  type="password"
                  id="confirm-password"
                  v-model="confirmPassword">
        </div>
          <label for="status">Státusz</label>
<br>
	<input type="radio" id="statusTeacher" value="1" v-model="status"><label> Tanár </label> 
	<input type="radio" id="statusStudent" value="2" v-model="status"><label> Diák </label> <br>

        <div class="input inline">
          <input type="checkbox" id="terms" v-model="terms">
          <label for="terms">Elfogadom a feltételeket!</label>
        </div>
        <div class="submit">
          <button type="submit">Elküld</button>
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
        email: '',
        password: '',
        confirmPassword: '',
        status: null,
        showSignUpSuccess: false,
        showSignUpForm: true,
        terms: false
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          status: this.status,
          terms: this.terms
        }
        this.$store.dispatch('signup', formData)
      },

	goToPage (page) {
		this.$router.push({ path: `/${page}` }) 
	},
    }, // methods

 mounted() {
		this.$store.watch(this.$store.getters.getSignedInEmail, signedInEmail => { 
			console.log("Async Call email");
			this.showSignUpSuccess=true;
			this.showSignUpForm=true;
		});

 } // mouted
  }
</script>

<style scoped>
  .signup-form {
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

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #8d4288;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    border: 1px solid #000000;
    color: #ffffff;
    background-color: #000088;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #0000cc;
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
