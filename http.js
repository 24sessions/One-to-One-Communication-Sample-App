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
