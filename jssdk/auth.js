var AuthAPI = function(authAPIUrl) {
    this.getToken = function(appId, privateKey, tokenCallback) {
        Http.postJson(authAPIUrl, {app_id: appId, private_key: privateKey}, function(responseObject) {
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
