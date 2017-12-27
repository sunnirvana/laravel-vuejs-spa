import VueRouter from 'vue-router';

const Home = require('./components/pages/Home');
const About = require('./components/pages/About');
const Post = require('./components/posts/Post');

const routes = [
    {path: '/', component: Home},
    {path: '/home', component: Home},
    {path: '/about', component: About},
    {path: '/posts/:postId', name: 'post', component: Post},
];

export default new VueRouter({
    mode: 'history',
    routes
})
