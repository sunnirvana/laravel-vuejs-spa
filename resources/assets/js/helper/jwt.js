import Cookies from 'js-cookie';

export default {
    setToken(token) {
        window.localStorage.setItem('jwt_token', token);
    },
    getToken() {
        return window.localStorage.getItem('jwt_token');
    },
    removeToken() {
        window.localStorage.removeItem('jwt_token');
    },
    setAuthId(authId) {
        Cookies.set('auth_id', authId);
    },
    getAuthId() {
        return Cookies.get('auth_id');
    },
    removeAuthId() {
        Cookies.remove('auth_id');
    }

}