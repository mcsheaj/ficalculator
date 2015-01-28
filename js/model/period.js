models.factory('model/period', [

    function () {
        'use strict';

        function Period(settings) {
            angular.extend(this, settings);
        }

        return Period;
}]);
