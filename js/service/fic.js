services.factory('ficService', ['$q', 'ficUserService', 'ficPeriod',
    function ($q, userservice, FICPeriods) {
		'use strict';
		var ficService = {};

		ficService.calculate = function (settings) {
			ficService.FIC = new FICPeriods(settings, 25);
			ficService.FIC.calculate();
		};

		ficService.FIC = null;

		return ficService;
}]);
