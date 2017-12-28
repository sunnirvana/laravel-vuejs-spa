import VueRouter from 'vue-router';

const Home = require('./components/pages/Home');
const About = require('./components/pages/About');
const Post = require('./components/posts/Post');
const Register = require('./components/register/Register');
const Confirm = require('./components/common/Confirm');

const routes = [
    {path: '/', component: Home},
    {path: '/home', component: Home},
    {path: '/about', component: About},
    {path: '/posts/:postId', name: 'post', component: Post},
    {path: '/register', name: 'register', component: Register},
    {path: '/confirm', name:'confirm', component: Confirm}
];

export default new VueRouter({
    mode: 'history',
    routes
})
