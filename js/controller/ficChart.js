app.controller('ficChart', ['$scope', 'ficService', 'ficChartService',
    function ($scope, ficService, ficChartService) {

		var ctx = $("#fichart").get(0).getContext("2d");
		var fiChart = new Chart(ctx);

		$scope.plot = function (ficData) {
			var chartData = ficChartService.toChartModel(ficData);
			if (chartData){
				fiChart.Line(chartData);
			}
		};

		$scope.$on('fic-recalculate', function(){
			$scope.plot(ficService.FIC);
		});

		$scope.plot(ficService.FIC);
}]);
