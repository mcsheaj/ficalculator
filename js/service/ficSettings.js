services.factory('ficSettings', ['$q',
    function ($q) {
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

        var FIData = Parse.Object.extend("FIData");

        var SettingsService = {

            getSettings: function (userId) {
                var query,
                    deferred = $q.defer(),
                    settings;

                if (userId === 'anonymous') {
                    settings = JSON.parse(localStorage.getItem('fic-settings')) || {};
                    deferred.resolve(settings[userId] || defaults);
                } else {
                    query = new Parse.Query(FIData);
                    query.get(userId).then(function (current_settings) {
                        deferred.resolve(current_settings || defaults);
                    }, function () {
                        deferred.resolve(defaults);
                    });
                }

                return deferred.promise;
            },

            setSettings: function (userId, settings) {
                var deferred = $q.defer();

                if (userId === 'anonymous') {
                    var current_settings = JSON.parse(localStorage.getItem('fic-settings')) || {};
                    current_settings[userId] = settings;
                    localStorage.setItem('fic-settings', JSON.stringify(current_settings));
                    deferred.resolve();

                    return deferred.promise;
                } else {
                    return SettingsService.getSettings(userId).then(function (current_settings) {
                        return current_settings.save(settings);
                    });
                }
            },
        };



        return SettingsService;
}]);
