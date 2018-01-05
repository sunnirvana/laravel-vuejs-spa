import jwtToken from './../../helper/jwt';

export default {
    actions: {
        storeTokens({commit}, responseData) {
            jwtToken.setAuthId(responseData.auth_id);
            jwtToken.setToken(responseData.token);
        },
        removeTokens() {
            jwtToken.removeToken();
            jwtToken.removeAuthId();
        },
    }
}