<template>
    <div>
        <div class="panel panel-default">
            <ul class="list-group">
                <li class="list-group-item">
                    User name:<br/>
                    <h4>{{ user.name }}</h4>
                </li>
                <li class="list-group-item">
                    User email:<br/>
                    <h4>{{ user.email }}</h4>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: '',
        create() {
            this.$store.dispatch('setAuthUser');
        },
        computed: {
            ...mapState({
                user: state => state.AuthUser,
            })
        }
    }
</script>
