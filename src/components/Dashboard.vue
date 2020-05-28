<template>
  <div id="dashboard">
    <h1>{{ name }}, welcome to the E-Learn Tracker Dashboard!</h1>
    <p>To view and add new courses go to Courses Tab.</p>
  </div>
</template>


<script>
import axios from 'axios';

export default {
    computed: {
      email (){
        return !this.$store.getters.user ? false : this.$store.getters.user.email
      },
      name(){
        return !this.$store.getters.user ? false : this.$store.getters.user.name
      }
    },
    created(){
       this.$store.dispatch('fetchUser')
    },
    data(){
        return {
         // email: ''
        };
    }
}

</script>

<style scoped>
  h1{
    text-align: center;
  }
</style>