services.factory('ficSettings', ['$q',
    function ($q) {
        'use strict';

        var defaults = {
                'age': 28,
                'networth': 100000,
                'savings': 2000,
                'savings_rate': 1,
                'withdrawal_rate': 4,
                'goal': 50000,
                'goal_rate': 2,
                'inflation': 3,
                'ror': 8,
            },
            cache = {};

        var FIData = Parse.Object.extend("FIData");

        var SettingsService = {

            getSettings: function (userId) {
                var query,
                    deferred = $q.defer(),
                    settings,
                    current_data = {};

                if (userId === 'anonymous') {
                    settings = JSON.parse(localStorage.getItem('fic-settings')) || {};
                    angular.extend(current_data, defaults, settings[userId] || {});

                    deferred.resolve(current_data);
                } else {
                    query = new Parse.Query(FIData);
                    if (cache[userId]) {
                        current_data = cache[userId];

                        deferred.resolve(current_data.toJSON());
                    } else {
                        query.equalTo('userId', userId);
                        query.find().then(function (current_settings) {
                            if (current_settings.length > 0) {
                                current_data = current_settings[0];
                                cache[userId] = current_data;
                                deferred.resolve(current_data.toJSON() || defaults);
                            } else {
                                current_data = new FIData(defaults);
                                current_data.set('userId', userId);
                                cache[userId] = current_data;

                                deferred.resolve(defaults);
                            }
                        });
                    }
                }

                return deferred.promise;
            },

            setSettings: function (userId, settings) {
                var deferred = $q.defer(),
                    current_data;

                if (userId === 'anonymous') {
                    var current_settings = JSON.parse(localStorage.getItem('fic-settings')) || {};
                    current_settings[userId] = settings;
                    localStorage.setItem('fic-settings', JSON.stringify(current_settings));
                    deferred.resolve();

                    return deferred.promise;
                } else {
                    return SettingsService.getSettings(userId).then(function () {
                        current_data = cache[userId];
                        return current_data.save(settings);
                    });
                }
            },
        };



        return SettingsService;
}]);
