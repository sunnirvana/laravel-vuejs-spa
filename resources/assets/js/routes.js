import VueRouter from 'vue-router';

const Home = require('./components/Home');
const About = require('./components/About');

const routes = [
    {path: '/', component: Home},
    {path: '/home', component: Home},
    {path: '/about', component: About},
];

export default new VueRouter({
    mode: 'history',
    routes
})
