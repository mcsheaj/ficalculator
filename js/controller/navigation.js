app.controller('controller/navigation', ['$scope', 'service/navigation',

    function ($scope, navigationService) {
        'use strict';

        $scope.transition = function (e) {
            if (e.keyCode === 39) {
                $scope.transitionLeft();
            } else if (e.keyCode === 37) {
                $scope.transitionRight();
            }
        };

        $scope.transitionLeft = function () {
            $scope.current_page = navigationService.nextPage($scope.current_page + 1);
        };

        $scope.transitionRight = function () {
            $scope.current_page = navigationService.previousPage($scope.current_page - 1);
        };

        $scope.transitionPage = function (page_number) {
            $scope.current_page = navigationService.setPage(page_number);
        };

        $scope.current_page = navigationService.page;

}]);
