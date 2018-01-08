<template>
    <form class="form-horizontal" @submit.prevent="changeProfile">

        <div class="form-group" :class="{'has-error': errors.has('password')}">
            <label for="password" class="col-md-4 control-label">Password</label>

            <div class="col-md-6">
                <input v-model="password"
                       v-validate data-vv-rules="required|min:6" data-vv-as="PASSWORD"
                       id="password" type="password" class="form-control" name="password" required>
                <span class="help-block" v-show="errors.has('password')">{{ errors.first('password')}}</span>
            </div>
        </div>

        <div class="form-group" :class="{'has-error': errors.has('password_confirmation')}">
            <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>

            <div class="col-md-6">
                <input v-validate data-vv-rules="required|confirmed:password" data-vv-as="CONFIRMATION"
                       id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                <span class="help-block" v-show="errors.has('password_confirmation')">{{ errors.first('password_confirmation')}}</span>
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-6 col-md-offset-4">
                <button type="submit" class="btn btn-primary">
                    Change
                </button>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: "edit-password-form",
        data() {
            return {
                password: ''
            }
        },
        methods: {
            changeProfile() {
                axios.post('/api/change/password', {password: this.password}).then(response => {
                    // back to Profile page
                    this.$router.push({name: 'profile'});
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }
</script>

<style scoped>

</style>