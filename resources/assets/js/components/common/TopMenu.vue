<template>
    <div class="navbar">
        <router-link class="navbar-brand" to="/home">Home</router-link>
        <ul class="nav navbar-nav">
            <router-link v-if="!user.authenticated" tag="li" to="/login"> <a>Login</a> </router-link>
            <router-link v-if="!user.authenticated" tag="li" to="/register"> <a>Register</a> </router-link>
            <router-link v-if="user.authenticated" tag="li" to="/profile"> <a>Profile</a> </router-link>
            <li v-if="user.authenticated"><a href="#" @click="logout">Logout</a></li>
            <router-link tag="li" to="/about"> <a>About</a> </router-link>
        </ul>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "top-menu",
        computed: {
            ...mapState({
                user: state => state.AuthUser,
            }),
        }
    }
</script>

<style scoped>

</style>