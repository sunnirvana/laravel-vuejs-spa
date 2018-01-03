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

        <div class="form-group" :class="{'has-error': errors.has('password') || bag.has('email:auth')}">
            <label for="password" class="col-md-4 control-label">Password</label>

            <div class="col-md-6">
                <input v-model="password"
                       v-validate data-vv-rules="required|min:6" data-vv-as="PASSWORD"
                       id="password" type="password" class="form-control" name="password" required>
                <span class="help-block" v-show="errors.has('password')">{{ errors.first('password') }}</span>
                <span class="help-block" v-show="bag.has('email:auth')">{{ bag.first('email:auth') }}</span>
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
    import jwtToken from './../../helper/jwt';
    import axios from 'axios';
    import {ErrorBag} from 'vee-validate';

    export default {
        name: "login-form",
        data() {
            return {
                email: '',
                password: '',
                bag: new ErrorBag()
            }
        },
        watch: {
            password() {
                if (this.bag.count()) {
                    this.bag.clear();
                }
            }
        },
        methods: {
            login: function () {
                // don't login if any field validation is failed
                this.$validator.validateAll().then(result => {
                    if (result) {
                        let formData = {
                            email: this.email, password: this.password,
                        };

                        axios.post('/api/login', formData).then(response => {
                            // locally store access token
                            jwtToken.setToken(response.data.token);

                            // store auth user by vuex
                            this.$store.dispatch('SetAuthUser');

                            // go to page
                            this.$router.push({ name: 'profile' });
                        }).catch(error => {
                            console.log(error);
                            // Credentials not matched
                            if (error.response.status === 421) {
                                this.bag.add('email', 'Credentials not matched', 'auth');
                            }
                        });

                    }
                });

                // go to login if any validation failed
                this.$router.push({ name: 'login' });
            }
        }
    }
</script>

<style scoped>

</style>