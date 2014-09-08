app.controller('fic-controller', ['$scope', 'fic-settings', 'fic-model',
    function ($scope, ficSettings, FICModel) {
        'use strict';

        $scope.calculate = function () {
            if ($scope.ficForm.$valid) {
                $scope.FIC = new FICModel($scope.settings, 25);
                $scope.FIC.calculate();

                ficSettings.setSettings($scope.settings);
            }
        };
        
        $scope.settings = {};

        ficSettings.getSettings().then(function (settings) {
            if (settings) {
                angular.extend($scope.settings, settings);
            } else {
                $scope.settings.age = 28;

                $scope.settings.networth = 100000;

                $scope.settings.savings = 2000;

                $scope.settings.withdrawal_rate = 4;

                $scope.settings.goal = 50000;

                $scope.settings.inflation = 3;

                $scope.settings.ror = 8;
            }
            
            $scope.calculate();
        });
}]);