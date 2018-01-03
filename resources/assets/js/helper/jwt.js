export default {
    setToken(token) {
        if (token && token !== 'undefined') {
            window.localStorage.setItem('jwt_token', token);
        } else {
            window.localStorage.setItem('jwt_token', '');
        }
    },
    getToken() {
        return window.localStorage.getItem('jwt_token');
    },
    removeToken() {
        window.localStorage.removeItem('jwt_token');
    }
}