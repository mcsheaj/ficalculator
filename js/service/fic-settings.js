app.factory('fic-settings', ['$q',
    function ($q) {
        'use strict';
        
        return {
            getSettings: function () {
                var deferred = $q.defer(),
                    settings = JSON.parse(localStorage.getItem('fic-settings'));
                
                deferred.resolve(settings);
                
                return deferred.promise;
            },

            setSettings: function (settings) {
                var current_settings = {
                    'age': settings.age,
                    'networth': settings.networth,
                    'savings': settings.savings,
                    withdrawal_rate: settings.withdrawal_rate,
                    goal: settings.goal,
                    inflation: settings.inflation,
                    ror: settings.ror,
                };
                
                localStorage.setItem('fic-settings', JSON.stringify(current_settings));
            }
        };
}]);