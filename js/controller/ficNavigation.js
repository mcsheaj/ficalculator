app.controller('ficNavigation', ['$scope',
    function ($scope) {
        'use strict';

        var configs = {
            current_page: 1,
            max_page: 3,
        };

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
