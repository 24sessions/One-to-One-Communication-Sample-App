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
