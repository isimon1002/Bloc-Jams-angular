(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
              });

    $stateProvider
        .state('landing', {
            url: '/',
            templateUrl: '../app/templates/landing.html'
          })
        .state('album', {
          url: '/',
          templateUrl: '../app/templates/album.html'
        })
        .state('collection', {
          url: "/",
          templateUrl: '../app/templates/collection.html'
        });
    }

angular.module('blocJams', ['ui.router']);
    angular
        .module('blocJams', ['ui.router'])
        .config(config);
})();
