Tamin = {

    // Production server
    /*CLIENT_VERSION: '1.1.7',
    ACCESS_TOKEN: 'access_token',
    EXPIRES_IN: 'expires_in',
    REDIRECT_URL: 'https://incoming.tamin.ir/auth/access',
    BASE_URL: 'https://incoming.tamin.ir/view/index.html',
    AUTHENTICATION_ENDPOINT: 'https://account.tamin.ir/auth/server/authorize',
    VERIFY_ENDPOINT: 'https://incoming.tamin.ir/api/auth/access/verify',
    LOGOUT_URL: 'https://account.tamin.ir/auth/signout',
    RESPONSE_TYPE: 'assertion',
    CLIENT_ID: '71461c047d761f33242c0c0a7e4c6a09',*/

    // Local server
    ACCESS_TOKEN: 'access_token',
    EXPIRES_IN: 'expires_in',
    REDIRECT_URL: 'http://172.16.13.178:1841/index.html',
    BASE_URL: 'http://172.16.13.178:1841/index.html',
    AUTHENTICATION_ENDPOINT: 'http://account-test.tamin.ir:9090/auth/server/authorize',
    LOGOUT_URL: 'http://idm-server.tamin.org:9001/auth/signout',
    RESPONSE_TYPE: 'token',
    CLIENT_ID: 'coreaccount-js',

    getParameterByName: function (name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[#&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    checkAuthentication: function () {
        var self = this;
        if (this.getParameterByName(self.ACCESS_TOKEN) !== null && this.getParameterByName(self.EXPIRES_IN) !== null) {
            localStorage.setItem(self.ACCESS_TOKEN, this.getParameterByName(self.ACCESS_TOKEN));
            localStorage.setItem(self.EXPIRES_IN, this.getParameterByName(self.EXPIRES_IN));
            if (localStorage.getItem('return_url') !== null) {
                window.location.href = localStorage.getItem('return_url');
                localStorage.removeItem('return_url');
            } else {
                history.pushState("", document.title, window.location.pathname);
            }
            return;
        }
        if (localStorage.getItem(self.ACCESS_TOKEN) !== null) {
            if (self.RESPONSE_TYPE !== 'token') {
                self.isValidToken();
            } else {
                return;
            }
        }


        localStorage.setItem('return_url', window.location.href);
        self.redirectToLogin();
    },
    redirectToLogin: function () {
        var self = this;
        window.location.href = self.AUTHENTICATION_ENDPOINT
            + "?redirect_uri=" + self.REDIRECT_URL
            + "&response_type=" + self.RESPONSE_TYPE
            + "&client_id=" + self.CLIENT_ID;

    },
    logout: function () {
        var self = this;
        localStorage.removeItem(self.ACCESS_TOKEN);
        window.location.href = self.LOGOUT_URL + '?redirect_uri=' + self.BASE_URL;
    },
    isValidToken: function () {
        var self = this;
        var result = false;
        var httpRequest = null;
        if (window.XMLHttpRequest) {
            httpRequest = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }

        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                result = httpRequest.status === 200;
            }
        };

        httpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem(self.ACCESS_TOKEN));
        httpRequest.open('GET', self.VERIFY_ENDPOINT, true);
        httpRequest.send(null);
        return result;
    }
};

