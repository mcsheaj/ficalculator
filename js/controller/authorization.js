app.controller('controller/authorization', ['$scope', 'service/user',
    function ($scope, userService) {
        'use strict';

        $scope.currentUserId = 'anonymous';

        $scope.login = function () {
            userService.login().then(setUser);
        };

        $scope.logout = function () {
            userService.logout();
            setUser();
        };

        function setUser(){
            $scope.currentUserId = userService.getUserId();
        }
}]);
