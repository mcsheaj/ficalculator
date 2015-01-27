app.controller('controller/chart', ['$scope', 'service/calculator', 'service/chart',
    function ($scope, calculatorService, chartService) {
        'use strict';

		var ctx = $("#fichart").get(0).getContext("2d");
		var fiChart = new Chart(ctx);

        Chart.defaults.global.responsive = true;
        Chart.defaults.global.scaleLabel = "<%=fic.toCurrency(value)%>";

		$scope.plot = function (periods) {
			var chartData = chartService.toChartModel(periods);
			if (chartData){
				fiChart.Line(chartData);
			}
		};

		$scope.$on('fic-recalculate', function(){
			$scope.plot(calculatorService.periods);
		});

		$scope.plot(calculatorService.periods);
}]);
