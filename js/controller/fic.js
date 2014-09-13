app.controller('ficController', ['$scope', 'ficService', 'ficSettings', 'ficUserService',
    function ($scope, ficService, ficSettings, userservice) {
        'use strict';

        $scope.settings = {};

        loadSettings();

        $scope.login = function () {
            userservice.login().then(loadSettings);
        };

        $scope.logout = function () {
            userservice.logout();
            loadSettings();
        };

        $scope.toggleHelp = function (event) {
            var name = event.currentTarget.attributes.getNamedItem("name").value;
            $('.help-context[data-for="' + name + '"]').toggle(event.type === 'focus');
        };

        $scope.calculate = function () {
            if ($scope.ficForm.$valid) {
                calculate();
                ficSettings.setSettings($scope.currentUserId, $scope.settings);
            }
        };

        $scope.transition = function(page){
            var $current = $('.fic-page-current'),
                $new_page = $('.fic-page-' + page);

            $current.removeClass('fic-page-current fic-page-transition-in').addClass('fic-page-transition-out');
            $new_page.removeClass('fic-page-transition-out').addClass('fic-page-current fic-page-transition-in');
        };

        function calculate() {
            ficService.calculate($scope.settings);
            $scope.FIC = ficService.FIC;
            $scope.$broadcast('fic-recalculate');
        }

        function loadSettings() {
            var userId = userservice.getUserId();
            $scope.currentUserId = userId;
            ficSettings.getSettings(userId)
                .then(function (settings) {
                    if (settings) {
                        angular.extend($scope.settings, settings);
                    }

                    calculate();
                });
        }
}]);
