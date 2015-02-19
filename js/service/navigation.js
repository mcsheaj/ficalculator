services.factory('service/navigation', ['$rootScope',
    function ($rootScope) {
        'use strict';

        var configs = {
            max_page: 3,
            current_page: 1,
        };

        var service = {
            nextPage: function () {
                return service.setPage(configs.current_page + 1);
            },

            previousPage: function () {
                return service.setPage(configs.current_page - 1);
            },

            setPage: function (page_number) {
                var $fic_container;
                if (page_number >= 1 && page_number <= configs.max_page) {
                    $fic_container = $('.fic-page-container');
                    if ($fic_container.length > 0) {
                        $fic_container
                            .removeClass('fic-page-current-' + configs.current_page)
                            .addClass('fic-page-current-' + page_number);
                        configs.current_page = page_number;
                        $rootScope.$broadcast('fic-navigate', configs.current_page);
                    }
                }

                return configs.current_page;
            },

            get page() { return configs.current_page; },
        };

        return service;
}]);
