services.factory('service/chart', [

    function () {
        'use strict';

        var service = {
            toChartModel: function (periods) {
                var chartData = {
                    'labels': [],
                    'datasets': [
                        {
                            'label': 'Goal',
                            fillColor: "rgba(220,220,220,0.5)",
                            strokeColor: "rgba(220,220,220,0.8)",
                            highlightFill: "rgba(220,220,220,0.75)",
                            highlightStroke: "rgba(220,220,220,1)",
                            data: []
                        },
                        {
                            label: "Withdrawal",
                            fillColor: "rgba(151,187,205,0.5)",
                            strokeColor: "rgba(151,187,205,0.8)",
                            highlightFill: "rgba(151,187,205,0.75)",
                            highlightStroke: "rgba(151,187,205,1)",
                            data: []
                        },
                    ]
                },
                    period;

                if (periods) {
                    for (var i = 0; i < periods.length; i = i + 2) {
                        period = periods[i];
                        chartData.labels.push(period.age);
                        chartData.datasets[0].data.push(parseFloat(period.goal).toFixed(2));
                        chartData.datasets[1].data.push(parseInt(period.withdrawal_amount));
                    }

                    return chartData;

                } else {
                    return null;
                }
            }
        };

        return service;
}]);
