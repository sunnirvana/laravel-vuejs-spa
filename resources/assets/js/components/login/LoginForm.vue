<template>
    <form class="form-horizontal" @submit.prevent="login">

        <div class="form-group" :class="{'has-error' : errors.has('email')}">
            <label for="email" class="col-md-4 control-label">E-Mail Address</label>

            <div class="col-md-6">
                <input v-model="email"
                       v-validate data-vv-rules="required|email" data-vv-as="EMAIL"
                       id="email" type="email" class="form-control" name="email" required>
                <span class="help-block" v-show="errors.has('email')">{{ errors.first('email') }}</span>
            </div>
        </div>

        <div class="form-group" :class="{'has-error': errors.has('password')}">
            <label for="password" class="col-md-4 control-label">Password</label>

            <div class="col-md-6">
                <input v-model="password"
                       v-validate data-vv-rules="required|min:6" data-vv-as="PASSWORD"
                       id="password" type="password" class="form-control" name="password" required>
                <span class="help-block" v-show="errors.has('password')">{{ errors.first('password')}}</span>
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-6 col-md-offset-4">
                <button type="submit" class="btn btn-primary">
                    Login
                </button>
            </div>
        </div>
    </form>
</template>

<script>
    import JWTToken from './../helper/jwt';

    export default {
        name: "login-form",
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            login: function () {
                // don't login if any field validation is failed
                this.$validator.validateAll().then(result => {
                    if (result) {
                        let formData = {
                            email: this.email,
                            password: this.password,
                        };

                        axios.post('/api/login', formData).then(response => {
                            console.log(response);
                            JWTToken.setToken(response.data.access_token);
                            this.$router.push({name: 'confirm'});
                        }).catch(error => {
                            console.log(error);
                        });
                    }
                });

                // go to login if any validation failed
                this.$router.push({name: 'login'});
            }
        }
    }
</script>

<style scoped>

</style>