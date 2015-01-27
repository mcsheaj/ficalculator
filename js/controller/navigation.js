app.controller('controller/navigation', ['$scope',
    function ($scope) {
        'use strict';

        var configs = {
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
            $scope.transitionPage($scope.current_page + 1);
        };

        $scope.transitionRight = function () {
            $scope.transitionPage($scope.current_page - 1);
        };

        $scope.transitionPage = function(page_number) {
            var $fic_container;
            if (page_number >= 1 && page_number <= configs.max_page) {
                $fic_container = $('.fic-page-container');
                if ($fic_container.length > 0) {
                    $fic_container
                        .removeClass('fic-page-current-' + $scope.current_page)
                        .addClass('fic-page-current-' + page_number);
                    $scope.current_page = page_number;
                }
            }
        };

        $scope.current_page = 1;

}]);
