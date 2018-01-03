import VueRouter from 'vue-router';
import JWT from './helper/jwt';
import Store from './store/index';

// Components
import Home from './components/pages/Home';
import About from './components/pages/About';
import Post from './components/posts/Post';
import Register from './components/register/Register';
import Confirm from './components/common/Confirm';
import Login from './components/login/Login';
import Profile from './components/common/Profile';

const routes = [
    { path: '/', component: Home, meta: { requireAuth: false } },
    { path: '/home', component: Home, meta: { requireAuth: false } },
    { path: '/about', component: About, meta: { requireAuth: false } },
    { path: '/posts/:postId', name: 'post', component: Post, meta: { requireAuth: false } },
    { path: '/register', name: 'register', component: Register, meta: { requireAuth: false } },
    { path: '/confirm', name: 'confirm', component: Confirm, meta: { requireAuth: false } },
    { path: '/login', name: 'login', component: Login, meta: { requireAuth: false } },
    { path: '/profile', name: 'profile', component: Profile, meta: { requireAuth: true } },
];

const router = new VueRouter({
    mode: 'history', routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (Store.state.authenticated || JWT.getToken() && JWT.getToken() !== 'undefined') {
            next();
        } else {
            next({ name: 'login' });
        }
    } else {
        next();
    }
});

export default router;
