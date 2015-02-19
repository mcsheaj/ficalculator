app.controller('controller/chart', ['$scope', 'service/calculator', 'service/chart', 'service/navigation',
    function ($scope, calculatorService, chartService, navigationService) {
        'use strict';

        var ctx = $("#fichart").get(0).getContext("2d"),
            fiChart = new Chart(ctx),
            isDrawn = false;

        Chart.defaults.global.responsive = true;
        Chart.defaults.global.scaleLabel = "<%=fic.toCurrency(value)%>";

        $scope.plot = function (periods) {
            var chartData = chartService.toChartModel(periods);

            if (chartData) {
                fiChart = new Chart(ctx);
                fiChart.Line(chartData);
            }
        };

        $scope.$on('fic-recalculate', function () {
            redraw();
        });

        $scope.$on('fic-navigate', function () {
            if (!isDrawn && navigationService.page === 2) {
                redraw();
                isDrawn = true;
            }
        });

        function redraw() {
            $scope.plot(calculatorService.periods);
        }

}]);
