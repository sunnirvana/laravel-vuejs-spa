/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './routes';
import App from './components/App';
import store from './store/index';
import jwtToken from './helper/jwt';
import axios from 'axios';

// Localize takes the locale object as the second argument (optional) and merges it.
import ar from './locale/en.js';
import VeeValidate, {Validator} from 'vee-validate';

Validator.localize('ar', ar);
Vue.use(VeeValidate);

// Attach user token if it exists.
axios.interceptors.request.use(function (config) {
    if (jwtToken.getToken() && jwtToken !== 'undefined') {
        config.headers[ 'Authorization' ] = 'Bearer ' + jwtToken.getToken();
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

Vue.use(VueRouter);
Vue.component('app', App);

const app = new Vue({
    el: '#app', router, store
});
