app.controller('fic-controller', ['$scope', 'fic-settings', 'fic-model',
    function ($scope, ficSettings, FICModel) {
        'use strict';

        $scope.calculate = function () {
            if ($scope.ficSettings.$valid) {
                $scope.FIC = new FICModel($scope, 25);
                $scope.FIC.calculate();

                ficSettings.setSettings($scope);
            }
        };

        ficSettings.getSettings().then(function (settings) {
            if (settings) {
                angular.extend($scope, settings);
            } else {
                $scope.age = 28;

                $scope.networth = 250000;

                $scope.savings = 5000;

                $scope.withdrawal_rate = 4;

                $scope.goal = 50000;

                $scope.inflation = 3;

                $scope.ror = 8;
            }
        })
}]);