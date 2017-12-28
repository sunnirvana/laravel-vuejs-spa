
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
import VueRouter from 'vue-router';
import router from './routes';
import App from './components/App';

// Localize takes the locale object as the second argument (optional) and merges it.
import ar from './locale/en.js';
import VeeValidate, { Validator } from 'vee-validate';
Validator.localize('ar', ar);
Vue.use(VeeValidate);

Vue.use(VueRouter);
Vue.component('app', App);

const app = new Vue({
    el: '#app',
    router
});
