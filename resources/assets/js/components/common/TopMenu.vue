<template>
    <div class="navbar">
        <router-link class="navbar-brand" to="/home">Home</router-link>
        <ul class="nav navbar-nav">
            <router-link tag="li" to="/register"> <a>Register</a> </router-link>
            <router-link tag="li" to="/about"> <a>About</a> </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "top-menu"
    }
</script>

<style scoped>

</style>