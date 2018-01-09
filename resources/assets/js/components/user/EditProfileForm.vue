<template>
    <form class="form-horizontal" @submit.prevent="changeProfile">

        <div class="form-group" :class="{'has-error' : errors.has('name') || bag.has('name')}">
            <label for="name" class="col-md-4 control-label">User name</label>

            <div class="col-md-6">
                <input v-model="name"
                       v-validate data-vv-rules="required" data-vv-as="NAME"
                       id="name" type="text" class="form-control" name="name" required>
                <span class="help-block" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                <span class="help-block" v-show="bag.has('name')">{{ bag.first('name') }}</span>
            </div>
        </div>

        <div class="form-group" :class="{'has-error' : errors.has('email') || bag.has('email')}">
            <label for="email" class="col-md-4 control-label">E-Mail Address</label>
            <div class="col-md-6">
                <input v-model="email"
                       v-validate data-vv-rules="required|email" data-vv-as="EMAIL"
                       id="email" type="email" class="form-control" name="email" required>
                <span class="help-block" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                <span class="help-block" v-show="bag.has('email')">{{ bag.first('email') }}</span>
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
    import {ErrorBag} from 'vee-validate';

    export default {
        name: "edit-profile-form",
        mounted() {
            this.$store.dispatch('setAuthUser').then(response => {
                this.name = this.$store.state.AuthUser.name;
                this.email = this.$store.state.AuthUser.email;
            });
        },
        created() {
            // this.name = this.$store.state.AuthUser.name;
            // this.email = this.$store.state.AuthUser.email;
        },
        data() {
            return {
                name: '',
                email: '',
                bag: new ErrorBag(),
            }
        },
        watch: {
            name() {
                this.clearErrorBag();
            },
            email() {
                this.clearErrorBag();
            },
        },
        computed: {
            // name: {
            //     get() {
            //         return this.$store.state.AuthUser.name
            //     },
            //     set(value) {
            //         this.$store.commit({
            //             type: types.UPDATE_AUTH_NAME,
            //             user: value
            //         });
            //     }
            // },
            // email: {
            //     get() {
            //         return this.$store.state.AuthUser.email
            //     },
            //     set(value) {
            //         this.$store.commit({
            //             type: types.UPDATE_AUTH_EMAIL,
            //             email: value
            //         });
            //     }
            // }
        },
        methods: {
            changeProfile() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        const formData = {
                            name: this.name,
                            email: this.email,
                        };
                        // console.log(formData);
                        axios.post('/api/user/profile/update', formData).then(response => {
                            // back to Profile page
                            this.$message({
                                message: 'User profile changed successfully!',
                                type: 'success',
                                duration: 1500
                            });
                            this.$store.dispatch('setAuthUser');
                            this.$router.push({ name: 'profile' });
                        }).catch(error => {
                            // error handler
                            console.error(error, error.response);
                            if (error.response.status === 422 && error.response.data.errors) {
                                let parsedErrors = this.parseErrorBag(error.response.data.errors);
                                console.log(parsedErrors);
                                for (let i in parsedErrors) {
                                    this.bag.add(parsedErrors[i].type, parsedErrors[i].message);
                                }
                            } else {
                                this.$message({
                                    message: 'Failing to change User profile!',
                                    type: 'error',
                                    duration: 1500
                                });
                            }
                        })
                    }
                });
            },
            parseErrorBag(errorData) {
                let error = [];
                for (let i in errorData) {
                    error.push({
                        type: i,
                        message: errorData[i][0],
                    })
                }
                return error;
            },
            clearErrorBag() {
                if (this.bag.count()) {
                    this.bag.clear();
                }
            }
        }
    }
</script>

<style scoped>

</style>