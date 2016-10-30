(function () {
    angular.module('app')
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

            // Remove # from URL
            $locationProvider.html5Mode(true);

            // For any unmatched url, redirect to /live
            $urlRouterProvider.otherwise('/');

            // States
            $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'app/main/main.html',
                    controller: 'MainController',
                    controllerAs: 'vm'
                });
        });
})();
