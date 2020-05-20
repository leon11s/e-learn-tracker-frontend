import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

import Home from './components/Home.vue'
import Courses from './components/courses/Courses.vue'
import SignupPage from './components/auth/SignUp.vue'
import SigninPage from './components/auth/SignIn.vue'
import DashboardPage from './components/Dashboard.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home},
    { path: '/signup', component: SignupPage },
    { path: '/signin', component: SigninPage },
    { 
        path: '/courses', 
        component: Courses,
        beforeEnter (to, from, next) {
            if (store.state.idToken){
                next()
            } else {
                next('/signin')
            }
        }     
    },
    { 
        path: '/dashboard', 
        component: DashboardPage, 
        beforeEnter (to, from, next) {
            if (store.state.idToken){
                next()
            } else {
                next('/signin')
            }
        } 
    }
];


// Create the router instance and pass the `routes` option
export default new VueRouter({
    mode: 'history',
    routes 
  })
