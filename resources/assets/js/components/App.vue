<template>
    <div>
        <top-menu></top-menu>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>

    </div>
</template>

<script>
    import TopMenu from './common/TopMenu'
    export default {
        name: "app",
        components: {
            TopMenu
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