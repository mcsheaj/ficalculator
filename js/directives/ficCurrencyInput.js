app.directive('ficCurrencyInput', ['$filter',
    function ($filter) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {

                function fromCurrency(text) {
                    if (text) {
                        return parseFloat(text.replace(/\,|\.|\$/g, ''));
                    } else {
                        return 0;
                    }
                }

                function toCurrency(text) {
                    if (text) {
                        return $filter('currency')(text);
                    } else {
                        return '$0';
                    }
                }

                ngModel.$parsers.push(fromCurrency);
                ngModel.$formatters.push(toCurrency);
            }
        };
}]);
