services.factory('service/user', ['$q',
    function ($q) {
        'use strict';

        return {
            getUserId: function () {
                var currentUser = Parse.User.current();

                if (currentUser) {
                    return currentUser.id;
                } else {
                    return 'anonymous';
                }
            },

            login: function () {
                var deferred = $q.defer();

                try {
                    Parse.FacebookUtils.logIn('public_profile,email', {
                        success: function (user) {
                            deferred.resolve(user);
                        },
                        error: function (user, error) {
                            deferred.resolve(error);
                        }
                    });
                } catch (e) {
                    deferred.resolve(e);
                }

                return deferred.promise;
            },

            logout: function () {
                Parse.User.logOut();
            }
        };
}]);
