import VueRouter from 'vue-router';

const Home = require('Home');
const About = require('About');

const routes = [
    {path: '/', component: Home},
    {path: '/', component: About},
];

export default new VueRouter({
    routes
})
