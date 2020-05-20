<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{invalid: $v.email.$error}">
          <label for="email">E-Mail*</label>
          <input
                  type="email"
                  id="email"
                  @blur="$v.email.$touch()"
                  v-model="email">
          <p v-if="!$v.email.email" class="error-text">Please provide a valid email address.</p>
          <p v-if="!$v.email.uniqueEmail" class="error-text">E-mail already used.</p>
        </div>

        <div class="input" :class="{invalid: $v.name.$error}">
          <label for="name">Name*</label>
          <input
                  type="text"
                  id="name"
                  @blur="$v.name.$touch()"
                  v-model="name">
        </div>

        <div class="input" :class="{invalid: $v.surname.$error}">
          <label for="surname">Surname*</label>
          <input
                  type="text"
                  id="surname"
                  @blur="$v.surname.$touch()"
                  v-model="surname">
        </div>

          <div class="input" :class="{invalid: $v.username.$error}">
          <label for="username">Username*</label>
          <input
                  type="text"
                  id="username"
                  @blur="$v.username.$touch()"
                  v-model="username">
          <p v-if="!$v.username.uniqueUsername" class="error-text">Username already used.</p>
        </div>

        <div class="input" :class="{invalid: $v.password.$error}">
          <label for="password">Password*</label>
          <input
                  type="password"
                  id="password"
                  @blur="$v.password.$touch()"
                  v-model="password">
        </div>

        <div class="input" :class="{invalid: $v.confirmPassword.$error}">
          <label for="confirm-password">Confirm Password*</label>
          <input
                  type="password"
                  id="confirm-password"
                  @blur="$v.confirmPassword.$touch()"
                  v-model="confirmPassword">
        </div>

        <div class="input inline" :class="{invalid: $v.terms.$error}">
          <input 
                  type="checkbox" 
                  id="terms" 
                  @change="$v.terms.$touch()"
                  v-model="terms">
          <label for="terms">Accept Terms of Use</label>
        </div>

        
        <div class="submit" >
          <!-- dovolimo klik na submit samo v primeru, da so vsa polja uspešno validirana. -->
          <button type="submit" :disabled="$v.$invalid">Submit</button> 
        </div>

      </form>
    </div>
  </div>
</template>

<script>
  import { required, email, minLength, sameAs, checked} from 'vuelidate/lib/validators'
  import axios from './../../axios-auth'

  export default {
    data () {
      return {
        email: '',
        name: '',
        surname: '',
        username: '',
        password: '',
        confirmPassword: '',
        terms: false
      }
    },
    validations: {
      email: {
        required,
        email,
        // validiramo če email že obstaja v bazi
        uniqueEmail: val => {
          if (val === '') return true
          return axios.get('/users/emailexist?email=' + val)
            .then(res => {
              return res.data.exists === false
            })
        }
      },
      name: {
        required
      },
      surname: {
        required
      }, 
      username: {
        required,
        // validiramo če username že obstaja v bazi
        uniqueUsername: val => {
          if (val === '') return true
          return axios.get('/users/usernameexist?username=' + val)
            .then(res => {
              return res.data.exists === false
            })
        }
      },
      password: {
        required,
        minLen: minLength(6)
      },
      confirmPassword: {
        sameAs: sameAs('password')
      },
      terms: {
        checked (val) {
          return val
        }
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          name: this.name,
          surname: this.surname,
          username: this.username,
          password: this.password,
        }
        this.$store.dispatch('signup', formData)
        
      }
    }
  }
</script>

<style scoped>
  .input.invalid input {
    border: 1px solid red;
    background-color: #ffc9aa;
  }

  .input.invalid label {
    color: red;
  }

  .error-text {
    color: red;
    font-size: 70%;
  }

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