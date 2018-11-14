<template>
	<div>
  <p>My name is {{name}}</p>
  <button @click="changeName()">Change my name!</button>
	<ul>
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
    changeName: function() {
      this.name = 'Flavius'
    }
  },//methods
	watch: {
  	  name: function() {
     console.log("Changed by watch")
     console.log(this.name)
    }
  }
}
</script>
