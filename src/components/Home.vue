<template>
    <div id="home">
        <h1>Welcome to E-learn tracker</h1>
        <p>Please login it to enter.</p>
        <div class="cta">
            <router-link to="/signup" type="button" class="btn btn-primary" tag="button">Sign Up</router-link>
            <router-link to="/signin" type="button" class="btn btn-primary" tag="button">Sign In</router-link>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
  #id {
    width: 80%;
    margin: auto;
  }

  h1 {
    text-align: center;
  }

  p {
    text-align: center;
  }

  .cta {
    width: 300px;
    margin: auto;
    text-align: center;
  }

  .cta a {
    margin: 10px;
    text-decoration: none;
    display: inline-block;
    border: 1px solid #521751;
    border-radius: 3px;
    width: 100px;
    padding: 10px;
    box-sizing: border-box;
    color: #521751;
  }

  .cta a:hover,
  .cta a:active {
    background-color: #521751;
    color: white;
  }
</style>