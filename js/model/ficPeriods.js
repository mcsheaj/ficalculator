models.factory('ficPeriods', [

    function () {
        'use strict';

        function FICPeriods(settings, range) {
            this._age = settings.age;
            this._networth = settings.networth;
            this._savings = toAnnual(settings.savings, settings.savings_rate);
            this._withdrawal_rate = settings.withdrawal_rate;
            this._goal = toAnnual(settings.goal, settings.goal_rate);
            this._inflation = settings.inflation;
            this._ror = settings.ror;

            this._range = range;
        }

        FICPeriods.prototype.calculate = function () {
            var current_networth = this._networth,
                current_ror = toPercentage(this._ror),
                current_savings = this._savings,
                current_inflation = toPercentage(this._inflation),
                current_withdrawal = toPercentage(this._withdrawal_rate) - 1,
                current_goal = this._goal;

            this.periods = [];

            for (var i = 1; i <= this._range; i++) {
                current_networth = (current_networth + current_savings) * current_ror;
                current_savings *= current_inflation;
                current_goal *= current_inflation;

                this.periods.push({
                    'age': this._age + i,
                    'networth': current_networth,
                    'savings': current_savings,
                    'withdrawal_amount': current_networth * current_withdrawal,
                    'goal': current_goal,
                });
            }
        };

        function toAnnual(amount, from_rate) {
            return parseInt(from_rate) === 2 ? amount : amount * 12;
        }

        function toPercentage(value) {
            return 1 + (value / 100);
        }

        return FICPeriods;
}]);
