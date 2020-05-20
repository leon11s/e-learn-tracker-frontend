import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'

import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        idToken: null,
        user: null,
    },
    mutations: {
        authUser (state, userData){
            state.idToken = userData.token
        },
        storeUser (state, user){
            state.user = user
        },
        clearAuthData (state) {
            state.idToken = null
            state.user = null
        }
    },
    actions: {
        setLogoutTimer ({commit}, expirationTime) {
            setTimeout(() => {
                commit('clearAuthData')
            }, expirationTime * 1000 * 60) //convert to miliseconds, the API return the time in minutes
        },
        signup ({commit}, signUpData) {
            axios.post('/users', signUpData)
                .then(res => {
                    console.log(res)
                    router.push('signin')
                })
                .catch(error => {
                    console.log(error)
                    alert("Failed creating new user!")
                }) 
        },
        login ({commit, dispatch}, authData) {
            axios.post('/login/access-token', authData)
                .then(res => {
                    console.log(res)
                    commit('authUser', {token: res.data.access_token})
                    const now = new Date()
                    const expirationDate = new Date(now.getTime() + res.data.expiresIn * 60 * 1000)
                    localStorage.setItem('token', res.data.access_token)
                    localStorage.setItem('expirationDate', expirationDate)
                    dispatch('setLogoutTimer', res.data.expiresIn) 
                    router.push('dashboard')
                })
                .catch(error => {
                    console.log(error)
                    alert("Username or password is incorrect")
                }) 
        },
        tryAutoLogin({ commit }) {
            const token = localStorage.getItem('token')
            if (!token) {
                return
            }
            const expirationDate = localStorage.getItem('expirationDate')
            const now = new Date()
            if (now >= expirationDate) {
                return
            }
            commit('authUser', {token: token})
        },
        logout({commit}) {
            commit('clearAuthData')
            localStorage.removeItem('expirationDate')
            localStorage.removeItem('token')
            router.replace('/signin')

        },
        fetchUser ({commit, state}){
            if (!state.idToken){
                return
            }
            axios.get('/users/me', {headers: {'Authorization': 'Bearer ' + state.idToken}})
                .then(res => {
                    console.log(res);
                    const data = res.data
                    commit('storeUser', data)
                })
                .catch(error => console.log(error))
        }
    },
    getters: {
        user (state) {
            return state.user
        },
        isAuthenticated (state) {
            return state.idToken !== null 
        }
    }
})