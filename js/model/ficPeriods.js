models.factory('ficPeriods', [

    function () {
        'use strict';

        function FICPeriods(settings, range) {
            this._age = settings.age;
            this._networth = settings.networth;
            this._savings = settings.savings;
            this._withdrawal_rate = settings.withdrawal_rate;
            this._goal = settings.goal;
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
                current_networth = (current_networth + current_savings * 12) * current_ror;
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


        function toPercentage(value) {
            return 1 + (value / 100);
        }

        return FICPeriods;
}]);
