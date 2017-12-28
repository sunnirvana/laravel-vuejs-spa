<template>
    <div class="col-md-6 col-md-offset-3">
        <div class="panel panel-default">
            <div class="panel-heading">Register</div>

            <div class="panel-body">
                <register-form></register-form>
            </div>
        </div>
    </div>
</template>

<script>
    import RegisterForm from './RegisterForm'
    export default {
        name: "register",
        components: {
            RegisterForm
        }
    }
</script>

<style scoped>

</style>