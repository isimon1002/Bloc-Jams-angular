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
            templateUrl: '../app/template/landing.html'
          })
        .state('album', {
          url: '/',
          templateUrl: '../app/template/album.html'
        })
        .state('collection', {
          url: "/",
          templateUrl: '../app/template/collection.html'
        });
    }

angular.module('blocJams', ['ui.router']);
    angular
        .module('blocJams', ['ui.router'])
        .config(config);
})();
