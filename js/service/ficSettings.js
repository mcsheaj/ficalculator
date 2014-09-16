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
                    o;

                if (userId === 'anonymous') {
                    settings = JSON.parse(localStorage.getItem('fic-settings')) || {};
                    deferred.resolve(settings[userId] || defaults);
                } else {
                    query = new Parse.Query(FIData);
                    if (cache[userId]) {
                        o = cache[userId];
                        deferred.resolve(o.toJSON());
                    } else {
                        query.equalTo('userId', userId);
                        query.find().then(function (current_settings) {
                            if (current_settings.length > 0) {
                                o = current_settings[0];
                                cache[userId] = o;
                                deferred.resolve(o.toJSON() || defaults);
                            } else {
                                o = new FIData(defaults);
                                o.set('userId', userId);
                                cache[userId] = o;
                                deferred.resolve(defaults);
                            }
                        });
                    }
                }

                return deferred.promise;
            },

            setSettings: function (userId, settings) {
                var deferred = $q.defer(),
                    o;

                if (userId === 'anonymous') {
                    var current_settings = JSON.parse(localStorage.getItem('fic-settings')) || {};
                    current_settings[userId] = settings;
                    localStorage.setItem('fic-settings', JSON.stringify(current_settings));
                    deferred.resolve();

                    return deferred.promise;
                } else {
                    return SettingsService.getSettings(userId).then(function () {
                        o = cache[userId];
                        return o.save(settings);
                    });
                }
            },
        };



        return SettingsService;
}]);
