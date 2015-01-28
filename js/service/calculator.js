services.factory('service/calculator', [
    function () {
        'use strict';

        function toPercentage(num) {
            return 1 + num / 100;
        }

        function toAnnual(amount, from_rate) {
            return parseInt(from_rate) === 2 ? amount : amount * 12;
        }

        var calculatorService = {
            calculate: function (period) {
                var current_networth = period.networth,
                    current_ror = toPercentage(period.ror),
                    current_savings = toAnnual(period.savings, period.savings_rate),
                    current_inflation = toPercentage(period.inflation),
                    current_withdrawal = toPercentage(period.withdrawal_rate) - 1,
                    current_goal = period.goal;

                var periods = [];

                for (var i = 1; i <= period.range; i++) {
                    current_networth = (current_networth + current_savings) * current_ror;
                    current_savings *= current_inflation;
                    current_goal *= current_inflation;

                    periods.push({
                        'age': period.age + i,
                        'networth': current_networth,
                        'savings': current_savings,
                        'withdrawal_amount': current_networth * current_withdrawal,
                        'goal': current_goal,
                    });
                }

                calculatorService.periods = periods;
            },

            periods: [],
        };

        return calculatorService;
    }]);
