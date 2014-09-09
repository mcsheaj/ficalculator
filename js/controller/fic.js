app.controller('ficController', ['$scope', 'ficService', 'ficSettings', 'ficUserService',
    function ($scope, ficService, ficSettings, userservice) {
		'use strict';

		$scope.settings = {};

		loadSettings();

		$scope.login = function () {
			userservice.login().then(loadSettings);
		};

		$scope.logout = function () {
			userservice.logout().then(loadSettings);
		};

		$scope.toggleHelp = function (event) {
			var name = event.currentTarget.attributes.getNamedItem("name").value;
			$('.help-context[data-for="' + name + '"]').toggle(event.type === 'focus');
		};

		$scope.calculate = function () {
			if ($scope.ficForm.$valid) {
				calculate();
				ficSettings.setSettings($scope.currentUserId, $scope.settings);
			}
		};

		function calculate() {
			ficService.calculate($scope.settings);
			$scope.FIC = ficService.FIC;
			$scope.$broadcast('fic-recalculate')
		}

		function loadSettings() {
			userservice.getUserId()
				.then(function (userId) {
					$scope.currentUserId = userId;
					return ficSettings.getSettings(userId);
				})
				.then(function (settings) {
					if (settings) {
						angular.extend($scope.settings, settings);
					}

					calculate();
				});
		}
}]);
