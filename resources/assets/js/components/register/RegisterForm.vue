<template>
    <form class="form-horizontal" @submit.prevent="register">

        <div class="form-group">
            <label for="name" class="col-md-4 control-label">Name</label>

            <div class="col-md-6">
                <input v-model="name" id="name" type="text" class="form-control" name="name" required autofocus>
            </div>
        </div>

        <div class="form-group">
            <label for="email" class="col-md-4 control-label">E-Mail Address</label>

            <div class="col-md-6">
                <input v-model="email" id="email" type="email" class="form-control" name="email" required>
            </div>
        </div>

        <div class="form-group">
            <label for="password" class="col-md-4 control-label">Password</label>

            <div class="col-md-6">
                <input v-model="password" id="password" type="password" class="form-control" name="password" required>
            </div>
        </div>

        <div class="form-group">
            <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>

            <div class="col-md-6">
                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-6 col-md-offset-4">
                <button type="submit" class="btn btn-primary">
                    Register
                </button>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: "register-form",
        data() {
            return {
                name: '',
                email: '',
                password: ''
            }
        },
        methods: {
            register: function () {
                let formData = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                };

                axios.post('/api/register', formData).then(response => {
                    console.log(response.data.status, response.data.message);
                    this.$router.push('/confirm');
                });

            }
        }
    }
</script>

<style scoped>

</style>