<template>
    <div class="container">

<!-- W3 ANIMATION-->
    <button class="btn btn-primary" @click="w3()">W3 Cool Animation - Zoom</button>
	 <div class="w3-container"> <h1 v-bind:class="w3class">Animation is Fun!</h1> </div>  
<!-- W3 ANIMATION-->

<!-- VUE ANIMATION-->
 <div id="list-demo">
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
</div>
<!-- VUE ANIMATION-->

        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <button class="btn btn-primary" @click="show = !show">Show Alert</button>
                <br><br>
                <transition name="fade">
                    <div class="alert alert-info" v-show="show">This is some Info</div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import DangerAlert from './DangerAlert.vue';
    import SuccessAlert from './SuccessAlert.vue';

    export default {
        data() {
            return {
					w3class:"",
                show: false,
                numbers: [1, 2, 3, 4, 5],
					 items: [1,2,3,4,5,6,7,8,9],
 					 nextNum: 100
            }
        },
        methods: {
			  w3() {
				  this.w3class="w3-animate-zoom";
	//			  alert("xxx");
				  
				  },
			  randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    }
    }
	 }
</script>

<style>
    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity 2s;
    }

    .fade-leave {
        /*opacity: 1;*/
    }

    .fade-leave-active {
        transition: opacity 1s;
        opacity: 0;
    }
	 .list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

</style>

