define( [ 'angular',
        'tmdb/partials/modalActor/modalActorController' ],
    function( angular, movieTrailerController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: movieTrailerController,
                templateUrl: '/tmdb/partials/modalActor/modalActor.html',
                restrict: 'E',
                scope: {                    
                    act: '=ngModel'
                }
            };
        };
    });
    