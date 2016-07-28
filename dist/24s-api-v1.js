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
var AuthAPI = function(authAPIUrl) {
    this.getToken = function(appId, privateKey, tokenCallback) {
        Http.postJson(authAPIUrl, {api_id: appId, private_key: privateKey}, function(responseObject) {
            if (tokenCallback) {
                tokenCallback(responseObject.token);
            }
        }, function() {
            if (tokenCallback) {
                tokenCallback(null);
            }
        })
    }
}
var Http = function() {}

Http.token = null;

Http.request = function(requestType, url, body, successCallback, errorCallback) {
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open(requestType, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    if (Http.token) {
        xhr.setRequestHeader('X-24s-Token', Http.token);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (successCallback) {
                    successCallback(xhr.responseText);
                }
            } else {
                if (errorCallback) {
                    errorCallback(xhr.statusText);
                }
            }
        }
    }

    xhr.send(body);
}

Http.post = function(url, body, successCallback, errorCallback) {
    Http.request('POST', url, body, successCallback, errorCallback);
}

Http.put = function(url, body, successCallback, errorCallback) {
    Http.request('PUT', url, body, successCallback, errorCallback);
}

Http.postJson = function(url, object, successCallback, errorCallback) {
    Http.post(url, JSON.stringify(object), function(response) {
        if (successCallback) {
            successCallback(JSON.parse(response));
        }
    }, errorCallback);
}

Http.putJson = function(url, object, successCallback, errorCallback) {
    Http.put(url, JSON.stringify(object), function(response) {
        if (successCallback) {
            successCallback(JSON.parse(response));
        }
    }, errorCallback);
}
var SessionAPI = function(sessionApiUrl) {
    this.createSession = function(_clientUserId, _expertUserId, _sessionTime, _settings, successCallback, errorCallback) {
        Http.putJson(sessionApiUrl, {
          client_user_id: _clientUserId,
          expert_user_id: _expertUserId,
          session_time: _sessionTime,
          settings: _settings
        }, successCallback, errorCallback);
    }
}
var UserAPI = function(userAPIUrl) {
    var createUser = function(userType, userData, successCallback, errorCallback) {
        if (!userData) userData = {};
        userData.type = "expert";
        Http.putJson(userAPIUrl, userData, successCallback, errorCallback);
    }

    this.createExpert = function(userData, successCallback, errorCallback) {
        createUser("expert", userData, successCallback, errorCallback);
    }

    this.createClient = function(userData, successCallback, errorCallback) {
        createUser("client", userData, successCallback, errorCallback);
    }
}
