var models = angular.module('fic-models', []);
var services = angular.module('fic-services', []);
var app = angular.module('fi-calculator', ['fic-models', 'fic-services']);

app.config([

    function () {
        'use strict';

        if (location.host === 'localhost') {
            Parse.initialize("6dG6jBxdBOv95JQ1JyK7FWso4UJZtoEevG0d8eTv", "Vccx8u1WVccPaSiW1CJNlpjSlbsIOSDgTGyzmVM8");
        } else {
            Parse.initialize("5rjxuGJ24hcpW6nkiZLdYksWHv6w5UjqNIMtyEBP", "7iydBqyMAUBkOwRNryLxtxrqLjegDRHnhBSUsJ7m");
        }

        if (!!window.FB) {
            Parse.FacebookUtils.init({
                appId: location.host === 'localhost' ? "322187807961257" : "322176421295729",
                cookie: true, // enable cookies to allow the server to access
                // the session
                xfbml: true, // parse social plugins on this page
                version: 'v2.1' // use version 2.1
            });
        }
}]);
