app.controller('fic-controller', ['$scope', 'fic-settings', 'userservice', 'fic-model',
    function ($scope, ficSettings, userservice, FICModel) {
        'use strict';

        $scope.settings = {};

        loadSettings();

        $scope.login = function () {
            userservice.login().then(loadSettings);
        };

        $scope.logout = function () {
            userservice.logout().then(loadSettings);
        };

        $scope.calculate = function (force) {
            if ($scope.ficForm.$valid || force) {
                userservice.getUserId().then(function (userId) {
                    $scope.FIC = new FICModel($scope.settings, 25);
                    $scope.FIC.calculate();

                    ficSettings.setSettings(userId, $scope.settings);
                });
            }
        };

        function loadSettings() {
            userservice.getUserId()
                .then(function (userId) {
                    $scope.currentUserId = userId;
                    return ficSettings.getSettings(userId);
                })
                .then(function (settings) {
                    if (settings) {
                        angular.extend($scope.settings, settings);
                    }
                
                    $scope.calculate(true);
                });
        }
}]);