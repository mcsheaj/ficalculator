app.factory('userservice', ['$q',
    function ($q) {
        'use strict';

        var isInit = false;

        return {
            init: function () {
                if (!isInit) {
                    isInit = true;
                    FB.init({
                        appId: '322176421295729',
                        cookie: true, // enable cookies to allow the server to access 
                        // the session
                        xfbml: true, // parse social plugins on this page
                        version: 'v2.1' // use version 2.1
                    });
                }
            },

            getUserId: function () {
                var deferred = $q.defer();
                FB.getLoginStatus(function(response){
                    if (response.status === 'connected') {
                        deferred.resolve(response.authResponse.userID);
                    }else{
                        deferred.resolve('anonymous');
                    }
                });
                return deferred.promise;
            },

            login: function () {
                var defer = $q.defer();

                FB.getLoginStatus(function (response) {
                    if (response.status !== 'connected') {
                        FB.login(function (response) {
                            defer.resolve();
                        }, {
                            scope: 'public_profile,email'
                        });
                    } else {
                        userId = response.authResponse.userID;
                        defer.resolve();
                    }
                });

                return defer.promise;
            },

            logout: function () {
                var deferred = $q.defer();
                FB.logout(function (response) {
                    deferred.resolve();
                });

                return deferred.promise;
            }
        };
}]);