<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-custom">
        <span v-if="!auth">
            <router-link to="/" class="navbar-brand" tag="a">E-learn tracker</router-link>
        </span>
        <span v-if="auth">
            <router-link to="/dashboard" class="navbar-brand" tag="a">E-learn tracker</router-link>
        </span>
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <router-link v-if="auth" to="/dashboard" tag="li" activeClass="active"><a class="nav-link">Dashboard</a></router-link>
                <router-link v-if="auth" to="/courses" tag="li" activeClass="active"><a class="nav-link">Courses</a></router-link>

                <!-- TODO Dodaj ostale linke in gumbe -->
        
            </ul>
                <router-link v-if="!auth" to="/signup" type="button" class="btn btn-dark buttons-custom" tag="button">Sign Up</router-link>
                <router-link v-if="!auth" to="/signin" type="button" class="btn btn-dark buttons-custom" tag="button">Sign In</router-link>
                <button @click="onLogout" v-if="auth" class="btn btn-danger">Logout</button>
        </div>
    </nav>
</template>

<script>
export default {
    computed: {
        auth () {
            return this.$store.getters.isAuthenticated
        }
    },
    methods: {
        onLogout () {
            this.$store.dispatch('logout')
        }
    }
}
</script>

<style>
/* change the background color - https://colorhunt.co/palette/171695*/ 
.bg-custom {
    background-color: #2a7886;
}

.buttons-custom {
    margin-right: 10px;
    margin-left: 10px;
}
</style>