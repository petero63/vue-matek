<template>
<div>
<div class="alert alert-info">Példa Adminsiztráció</div>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="email">A pálda megoldásának következő lépése:</label>
          <input
                  type="email"
                  id="email"
                  v-model="email">
        </div>
<!--		  
<editor plugins="link code"  v-model="content" api-key="apiKey=d1tr83ga33vvezb16obm68acnqpxk3dlhif8hfbl9zyvszrv"></editor> 
-->
<textarea id="examplestep" v-model="examplestep"></textarea>
        <div class="submit">
          <button type="submit">Ment</button>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
//import Editor from '@tinymce/tinymce-vue'
//import '@tinymce/tinymce-vue/plugins/link';
//var Editor = require('@tinymce/tinymce-vue');
//var Editor = require('tinymce/tinymce-vue');
  export default {
    data () {
      return {
        email: '',
        examplestep: '',
        content: 'xxx',
        confirmPassword: '',
        status: null,
        terms: false
      }
    },

	components: {
	//	'editor': Editor
	},
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          examplestep: this.examplestep,
          content: this.content,
        }
        this.$store.dispatch('examplestepadd', formData)
      }
    }
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
