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
        },
        [types.REMOVE_AUTH_USER](state) {
            state.authenticated = false;
            state.name = null;
            state.email = null;
        }
    },
    actions: {
        SetAuthUser({ commit }) {
            axios.get('/api/user').then(response => {
                commit({
                    type: types.STORE_AUTH_USER,
                    user: response.data
                });
            });
        },
        RemoveAuthUser({ commit}) {
            commit({ type: types.REMOVE_AUTH_USER})
        }
    }
}