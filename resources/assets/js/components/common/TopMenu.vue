<template>
    <div class="navbar">
        <router-link class="navbar-brand" to="/home">Home</router-link>
        <ul class="nav navbar-nav">
            <router-link v-if="!user.authenticated" tag="li" to="/login"><a>Login</a></router-link>
            <router-link v-if="!user.authenticated" tag="li" to="/register"><a>Register</a></router-link>
            <router-link v-if="user.authenticated" tag="li" to="/profile"><a>Profile</a></router-link>
            <li v-if="user.authenticated"><a href="#" @click.prevent="logout">Logout</a></li>
            <router-link tag="li" to="/about"><a>About</a></router-link>
            <router-link tag="li" to="/eletable"><a>Element Test</a></router-link>
        </ul>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import axios from 'axios';

    export default {
        name: "top-menu",
        computed: {
            ...mapState({
                user: state => state.AuthUser,
            }),
        },
        methods: {
            logout() {
                axios.get('/api/logout').then(response => {
                    // clean user info, auth_id and token
                    this.$store.dispatch('removeAuthUser');

                    this.$router.push({ name: 'login' });
                })
            }
        }
    }
</script>

<style scoped>

</style>