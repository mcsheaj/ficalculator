app.factory('ficUserService', ['$q',
    function ($q) {
		'use strict';

		var isInit = false;

		return {
			init: function () {
				if (!isInit) {
					isInit = true;
					FB.init({
						appId: getAppId(),
						cookie: true, // enable cookies to allow the server to access
						// the session
						xfbml: true, // parse social plugins on this page
						version: 'v2.1' // use version 2.1
					});
				}
			},

			getUserId: function () {
				var deferred = $q.defer();

				getLoginStatus(deferred, function (response) {
					if (response.status === 'connected') {
						deferred.resolve(response.authResponse.userID);
					} else {
						deferred.resolve('anonymous');
					}
				});

				return deferred.promise;
			},

			login: function () {
				var deferred = $q.defer();

				getLoginStatus(deferred, function (response) {
					if (response.status !== 'connected') {
						FB.login(function (response) {
							deferred.resolve(response);
						}, {
							scope: 'public_profile,email'
						});
					} else {
						deferred.resolve(response);
					}
					clearTimeout(timerHandler);
				});

				return deferred.promise;
			},

			logout: function () {
				var deferred = $q.defer();
				FB.logout(function (response) {
					deferred.resolve(response);
				});

				return deferred.promise;
			}
		};

		function getLoginStatus(deferred, callback) {
			var timerHandler = setTimeout(function () {
				callback({});
				requestComplete(deferred);
			}, 1000);

			FB.getLoginStatus(function (response) {
				callback(response);
				clearTimeout(timerHandler);
			});
		}

		function requestComplete(defer, response) {
			defer.resolve(response);
		}

		function getAppId() {
			return location.host === 'localhost' ? "322187807961257" : "322176421295729";
		}
}]);
