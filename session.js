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
