app.directive('ficType', ['$filter',
    function ($filter) {
        'use strict';

        return {
            restrict: 'A',
            require: 'ngModel',
            scope: '=',
            link: function ($scope, element, attrs, ngModel) {

                function fromCurrency(text) {
                    if (text) {
                        return parseInt(text.replace(/\,|\$/g, ''));
                    } else {
                        return 0;
                    }
                }

                function inputFromCurrency(element) {
                    return function () {
                        var value = element.val(),
                            parsed = fromCurrency(value);

                        element.val(parsed);
                        element.attr('type', 'number');
                        element.focus();
                    };
                }

                function toCurrency(text) {
                    if (text) {
                        return ($filter('currency')(text)).slice(1);
                    } else {
                        return '0.0';
                    }
                }

                function inputToCurrency(element) {
                    return function () {
                        var value = element.val(),
                            parsed = toCurrency(value);

                        element.attr('type', 'text');
                        element.val(parsed);
                    };
                }

                element.focus(function () {
                    $scope.$apply(inputFromCurrency(element));
                    unwatch();
                });

                element.blur(function () {
                    $scope.$apply(inputToCurrency(element));
                });

                var unwatch = $scope.$watch(function () {
                    return ngModel.$modelValue;
                }, inputToCurrency(element));

                ngModel.$parsers.push(fromCurrency);
            }
        };
}]);
