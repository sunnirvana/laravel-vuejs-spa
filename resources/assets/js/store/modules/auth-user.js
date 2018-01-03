import * as types from '../mutation-type';
import axios from 'axios';

export default {
    state: {
        authenticated: false,
        name: null,
        email: null
    },
    mutations: {
        [ types.STORE_AUTH_USER ](state, payload) {
            state.authenticated = true;
            state.name = payload.user.name;
            state.email = payload.user.email;
        }
    },
    actions: {
        SetAuthUser({ commit }) {
            axios.get('/api/user').then(response => {
                console.log(response);
                commit({
                    type: types.STORE_AUTH_USER,
                    user: response.data
                });
            });
        }
    }
}