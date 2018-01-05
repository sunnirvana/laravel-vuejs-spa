import VueRouter from 'vue-router';
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
    { path: '/', name: 'root', component: Home, meta: {} },
    { path: '/home', name: 'home', component: Home, meta: {} },
    { path: '/about', name: 'about', component: About, meta: {} },
    { path: '/posts/:postId', name: 'post', component: Post, meta: {} },
    { path: '/confirm', name: 'confirm', component: Confirm, meta: {} },
    { path: '/login', name: 'login', component: Login, meta: { requireGuest: true } },
    { path: '/register', name: 'register', component: Register, meta: { requireGuest: true } },
    { path: '/profile', name: 'profile', component: Profile, meta: { requireAuth: true } },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (Store.state.AuthUser.authenticated) {
            next();
        } else {
            next({ name: 'login' });
        }
    } else if (to.meta.requireGuest) {
        if (Store.state.AuthUser.authenticated) {
            next({ name: 'home' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
