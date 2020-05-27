<template>
  <div id="app">
    <app-header></app-header>
    <br>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
  import Header from './components/Header.vue';

  export default {
    name: 'app',
    components: {
      appHeader: Header
    },
    created(){
      this.$store.dispatch('tryAutoLogin');
      this.$store.dispatch('getAllCourses');
    }
  }
</script>

<style>
  body, html {
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
</style>
