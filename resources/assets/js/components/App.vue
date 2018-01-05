<template>
    <div>
        <top-menu></top-menu>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>

    </div>
</template>

<script>
    import TopMenu from './common/TopMenu';
    import jwtToken from '../helper/jwt';

    export default {
        name: "app",
        components: {
            TopMenu
        },
        created() {
            // keep auth user info store
            if (jwtToken.getToken()) {
                this.$store.dispatch('setAuthUser').then(response => {
                    // nothing
                }).catch(error => {
                    console.log(error);
                    if (jwtToken.getAuthId()) {
                        this.$store.dispatch('refreshAuthToken')
                    } else {
                        this.$store.dispatch('removeToken')
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .6s
    }

    .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>