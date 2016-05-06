define( [ 'angular',
        'ngRoute',
        'config/config',
        'tmdb/services/TMDBAPIService'],
    function( angular, $routeParams, config, TMDBAPIService, $sce ) {
        "use strict";

        var modalActorController = function($scope, TMDBAPIService, $routeParams, $sce ) {
            
            $scope.details = {};     

            var api = TMDBAPIService.Movie();

            var getData = function(){
                api.movie.movie($scope.mov).then( function ( response ) {
                $scope.details = response.data;    

                });
            };    
              
            $scope.$watch('act',function(newValue,oldValue){                
                    getData();
            });         
            console.log($scope); 
        };

        modalActorController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams', '$sce' ];

        return modalActorController;
    }
);