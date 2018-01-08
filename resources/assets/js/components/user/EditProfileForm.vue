<template>
    <form class="form-horizontal" @submit.prevent="changeProfile">

        <div class="form-group" :class="{'has-error' : errors.has('name')}">
            <label for="name" class="col-md-4 control-label">User name</label>

            <div class="col-md-6">
                <input v-model="name"
                       v-validate data-vv-rules="required" data-vv-as="NAME"
                       id="name" type="text" class="form-control" name="name" required>
                <span class="help-block" v-show="errors.has('name')">{{ errors.first('name') }}</span>
            </div>
        </div>

        <div class="form-group" :class="{'has-error' : errors.has('email')}">
            <label for="email" class="col-md-4 control-label">E-Mail Address</label>
            <div class="col-md-6">
                <input v-model="email"
                       v-validate data-vv-rules="required|email" data-vv-as="EMAIL"
                       id="email" type="email" class="form-control" name="email" required>
                <span class="help-block" v-show="errors.has('email')">{{ errors.first('email') }}</span>
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
    import * as types from './../../store/mutation-type';

    export default {
        name: "edit-profile-form",
        created() {

        },
        data() {
            return {}
        },
        computed: {
            name: {
                get() {
                    return this.$store.state.AuthUser.name
                },
                set(value) {
                    this.$store.commit({
                        type: types.UPDATE_AUTH_NAME,
                        user: value
                    });
                }
            },
            email: {
                get() {
                    return this.$store.state.AuthUser.email
                },
                set(value) {
                    this.$store.commit({
                        type: types.UPDATE_AUTH_EMAIL,
                        email: value
                    });
                }
            }
        },
        methods: {
            changeProfile() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        const formData = {
                            name: this.name,
                            email: this.email,
                        };
                        axios.post('/api/user/profile/update', formData).then(response => {
                            // back to Profile page
                            this.$message({
                                message: 'User profile changed successfully!',
                                type: 'success',
                                duration: 1500
                            });
                            this.$router.push({ name: 'profile' });
                        }).catch(error => {
                            // error handler
                            console.error(error);
                            this.$message({
                                message: 'Failing to change User profile!',
                                type: 'error',
                                duration: 1500
                            });
                        })
                    }
                });
            }

        }
    }
</script>

<style scoped>

</style>