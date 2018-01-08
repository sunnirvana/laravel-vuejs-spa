<template>
    <div class="panel panel-default">
        <div class="panel-heading bg-danger">Change profile</div>

        <div class="panel-body">
            <edit-profile-form></edit-profile-form>
        </div>
    </div>
</template>

<script>
    import EditProfileForm from './EditProfileForm';

    export default {
        name: "edit-profile",
        components: {
            EditProfileForm
        }
    }
</script>

<style scoped>

</style>