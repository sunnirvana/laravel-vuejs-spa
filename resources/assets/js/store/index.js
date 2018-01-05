import Vue from 'vue';
import Vuex from 'vuex';
import AuthUser from './modules/auth-user';
import Tokens from './modules/tokens';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
       AuthUser, Tokens
    },
    strict: true
})