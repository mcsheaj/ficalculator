models.factory('model/period', [

    function () {
        'use strict';

        function Period(settings, range) {
            angular.extend(this, settings);
        }

        return Period;
}]);
