app.factory('userservice', ['$q',
    function ($q) {
        'use strict';

        var isInit = false;

        return {
            init: function () {
                if (!isInit) {
                    isInit = true;
                    FB.init({
                        appId: getAppId(),
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
                            defer.resolve(response);
                        }, {
                            scope: 'public_profile,email'
                        });
                    } else {
                        defer.resolve(response);
                    }
                });

                return defer.promise;
            },

            logout: function () {
                var deferred = $q.defer();
                FB.logout(function (response) {
                    deferred.resolve(response);
                });

                return deferred.promise;
            }
        };
        
        function getAppId(){
            return location.host === 'localhost' ? "322187807961257" : "322176421295729";
        }
}]);