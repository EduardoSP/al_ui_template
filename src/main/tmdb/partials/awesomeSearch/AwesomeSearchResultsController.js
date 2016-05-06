/**
 * AwesomeSearchResultsController provides controller support  displaying results
 *
 * @module tmdb.partials.search.AwesomeSearchResultsController
 *
 * @requires angular
 * @requires config
 * @requires TMDBAPIService
 *
 * @author John Gomez <jgomez@alertlogic.com>
 *
 * @returns instance of the AwesomeSearchResultsController
 *
 * @copyright Alert Logic, Inc 2016
 *
 */

define( [ 'angular',
          'config/config',
          'tmdb/services/TMDBAPIService'],
    function( angular, config, TMDBAPIService ) {
        "use strict";

        var AwesomeSearchResultsController = function($scope, TMDBAPIService ) {
        	$scope.currentMovie = 0;
        	$scope.setCurrentMovie = function(id, media_type) {
                 $scope.currentMovie = id;
                 $scope.media_type = media_type;   
          };
        };

        AwesomeSearchResultsController.$inject = [ '$scope', 'TMDBAPIService' ];

        return AwesomeSearchResultsController;
    }
);