app.factory('ficUserService', ['$q',
    function ($q) {
        'use strict';

        return {
            getUserId: function () {
                var currentUser = Parse.User.current();

                if (currentUser){
                    return currentUser.id;
                } else {
                    return 'anonymous';
                }
            },

            login: function () {
                var deferred = $q.defer();

                Parse.FacebookUtils.logIn('public_profile,email', {
                    success: function (user) {
                        deferred.resolve(user);
                    },
                    error: function (user, error) {
                        deferred.resolve(error);
                    }
                });

                return deferred.promise;
            },

            logout: function () {
                Parse.User.logOut();
            }
        };
}]);
