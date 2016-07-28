var API24Sessions = function(apiDomain, appId, privateKey, readyCallback) {
    const AUTH_URL = apiDomain + '/auth';
    const USER_URL = apiDomain + '/user';
    const SESSION_URL = apiDomain + '/session';

    var authAPI = new AuthAPI(AUTH_URL);
    var userAPI = new UserAPI(USER_URL);
    var sessionAPI = new SessionAPI(SESSION_URL);

    this.getAuthAPI = function() {
        return authAPI;
    }

    this.getUserAPI = function() {
        return userAPI;
    }

    this.getSessionAPI = function() {
        return sessionAPI;
    }

    authAPI.getToken(appId, privateKey, function(token) {
        Http.token = token;
        if (readyCallback) {
            readyCallback(token);
        }
    })
}
