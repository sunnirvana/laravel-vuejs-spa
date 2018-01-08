<template>
    <div class="panel panel-default">
        <div class="panel-heading bg-danger">Change password</div>

        <div class="panel-body">
            <edit-password-form></edit-password-form>
        </div>
    </div>
</template>

<script>
    import EditPasswordForm from './EditPasswordForm';

    export default {
        name: "edit-password",
        components: {
            EditPasswordForm
        }
    }
</script>

<style scoped>

</style>