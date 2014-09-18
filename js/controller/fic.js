app.controller('ficController', ['$scope', 'ficService', 'ficSettings', 'ficUserService',
    function ($scope, ficService, ficSettings, userService) {
        'use strict';

        var configs = {
            current_page: 1,
            max_page: 3,
        };

        $scope.settings = {};

        loadSettings();

        $scope.login = function () {
            userService.login().then(loadSettings);
        };

        $scope.logout = function () {
            userService.logout();
            loadSettings();
        };

        $scope.toggleHelp = function (event) {
            var name = event.currentTarget.attributes.getNamedItem("name").value;
            $('.help-context[data-for="' + name + '"]').toggle(event.type === 'focus');
        };

        $scope.calculate = function () {
            if ($scope.ficForm.$valid) {
                calculate();
                ficSettings.setSettings(userService.getUserId(), $scope.settings);
            }
        };

        $scope.currentUserId = userService.getUserId();

        $scope.transition = function (e) {
            if (e.keyCode === 39) {
                $scope.transitionLeft();
            } else if (e.keyCode === 37) {
                $scope.transitionRight();
            }
        };

        $scope.transitionLeft = function () {
            navigatePage(configs.current_page + 1);
        };

        $scope.transitionRight = function () {
            navigatePage(configs.current_page - 1);
        };

        function calculate() {
            ficService.calculate($scope.settings);
            $scope.FIC = ficService.FIC;
            $scope.$broadcast('fic-recalculate');
        }

        function loadSettings() {
            var userId = userService.getUserId();
            $scope.currentUserId = userId;
            ficSettings.getSettings(userId)
                .then(function (settings) {
                    if (settings) {
                        angular.extend($scope.settings, settings);
                    }

                    calculate();
                });
        }

        function navigatePage(page_number) {
            var $fic_container;
            if (page_number >= 1 && page_number <= configs.max_page) {
                $fic_container = $('.fic-page-container');
                if ($fic_container.length > 0) {
                    $fic_container
                        .removeClass('fic-page-current-' + configs.current_page)
                        .addClass('fic-page-current-' + page_number);
                    configs.current_page = page_number;
                }
            }
        }
}]);
