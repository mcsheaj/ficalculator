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

        $scope.toggleHelp = function (event) {
            var name = event.currentTarget.attributes.getNamedItem("name").value;
            $('.help-context[data-for="' + name + '"]').toggle(event.type === 'focus');
        };

        $scope.calculate = function () {
            if ($scope.ficForm.$valid) {
                calculate().then(function (userId) {
                    ficSettings.setSettings(userId, $scope.settings);
                });
            }
        };

        function calculate() {
            return userservice.getUserId().then(function (userId) {
                $scope.FIC = new FICModel($scope.settings, 25);
                $scope.FIC.calculate();

                return userId;
            });
        }

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

                    calculate();
                });
        }
}]);