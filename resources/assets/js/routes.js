import VueRouter from 'vue-router';
import Store from './store/index';
import jwtToken from './helper/jwt';

// Components
import Home from './components/pages/Home';
import About from './components/pages/About';
import Post from './components/posts/Post';
import Register from './components/register/Register';
import Confirm from './components/common/Confirm';
import Login from './components/login/Login';
import ProfileWrapper from './components/user/ProfileWrapper';
import Profile from './components/user/Profile';
import EditProfile from './components/user/EditProfile';
import EditPassword from './components/user/EditPassword';

import MyTable from './components/element_ui/MyTable';

const routes = [
    { path: '/', name: 'root', component: Home, meta: {} },
    { path: '/home', name: 'home', component: Home, meta: {} },
    { path: '/about', name: 'about', component: About, meta: {} },
    { path: '/posts/:postId', name: 'post', component: Post, meta: {} },
    { path: '/confirm', name: 'confirm', component: Confirm, meta: {} },
    { path: '/login', name: 'login', component: Login, meta: { requireGuest: true } },
    { path: '/register', name: 'register', component: Register, meta: { requireGuest: true } },
    {
        path: '/profile',
        // name: 'profile-root',
        component: ProfileWrapper,
        children: [
            { path: '', name: 'profile', component: Profile, meta: { requireAuth: true } },
            { path: 'edit-profile', name: 'profile.editProfile', component: EditProfile, meta: { requireAuth: true } },
            { path: 'edit-password', name: 'profile.editPassword', component: EditPassword, meta: { requireAuth: true } }
        ],
        meta: { requireAuth: true }
    },

    { path: '/eletable', name: 'my-table', component: MyTable, meta: {} },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (Store.state.AuthUser.authenticated || jwtToken.getToken()) {
        // if (Store.state.AuthUser.authenticated) {
            next();
        } else {
            next({ name: 'login' });
        }
    } else if (to.meta.requireGuest) {
        if (Store.state.AuthUser.authenticated || jwtToken.getToken()) {
        // if (Store.state.AuthUser.authenticated) {
            next({ name: 'home' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
