app.factory('ficSettings', ['$q', 'ficUserService',
    function ($q, userservice) {
        'use strict';

        var defaults = {
            'age': 28,
            'networth': 100000,
            'savings': 2000,
            'withdrawal_rate': 4,
            'goal': 50000,
            'inflation': 3,
            'ror': 8,
        };

        var SettingsService = function () {
            userservice.init();
        };

        SettingsService.prototype.getSettings = function (userId) {
            var deferred = $q.defer(),
                settings = JSON.parse(localStorage.getItem('fic-settings')) || {};

            if (userId) {
                deferred.resolve(settings[userId] || defaults);
            } else {
                deferred.resolve(settings || {});
            }

            return deferred.promise;

        };

        SettingsService.prototype.setSettings = function (userId, settings) {
            var promise = this.getSettings();

            promise.then(function (current_settings) {
                current_settings[userId] = settings;
                localStorage.setItem('fic-settings', JSON.stringify(current_settings));
            });
        };

        return new SettingsService();
}]);
