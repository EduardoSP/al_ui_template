/**
 * Creates the application root for an angular application at uri (/)
 *
 * @module app
 * 
 * @requires config/config
 * @requires ngRoute
 * @requires ngResource
 * @requires LocalStorageModule
 *
 * @param angular RequireJS inclusion of AngularJS library
 * @param config RequireJS inclusion of config/config
 *
 * @author Barry Skidmore <bskidmore@alertlogic.com>
 *
 * @returns instance of the app
 *
 * @copyright Alert Logic, Inc 2014
 */

define([ 'angular',
         'config/config',
         'ngRoute', 'ngResource', 'LocalStorageModule',
         'tmdb/services/TMDBAPIService',
         'tmdb/partials/search/SearchController',
         'tmdb/partials/home/HomeController',
         'tmdb/partials/movie/MovieController',
         'tmdb/partials/movieTrailer/movieTrailerController',
         'tmdb/partials/television/TelevisionController',
         'tmdb/partials/television/TelevisionSeasonController',
         'tmdb/partials/television/TelevisionEpisodeController',
         'tmdb/partials/money/MoneyController',
         'tmdb/partials/person/PersonController',
         'tmdb/partials/awesomeSearch/AwesomeSearchController',
         'tmdb/partials/awesomeSearch/AwesomeSearchResultsController',
         'tmdb/partials/remoteImageLoader/RemoteImageLoader',
         'tmdb/partials/movie/YearController',
         'tmdb/partials/modalActor/modalActorController',
         'tmdb/directives/search',
         'tmdb/directives/popularMovies',
         'tmdb/directives/personDetail',
         'tmdb/directives/personCrew',
         'tmdb/directives/personCast',
         'tmdb/directives/movieDetail',
         'tmdb/directives/similarMovies',
         'tmdb/directives/movieCast',
         'tmdb/directives/movieCrew',
         'tmdb/directives/money',
         'tmdb/directives/awesomeSearch',
         'tmdb/directives/awesomeSearchResults',
         'tmdb/directives/movieTrailer',
         'tmdb/directives/year',
         'tmdb/directives/modalActor'], 
    function( angular, config, $resource, $location, LocalStorageModule, 
              TMDBAPIService, SearchController, HomeController, MovieController, movieTrailerController,
              TelevisionController,TelevisionSeasonController,TelevisionEpisodeController,
              MoneyController, PersonController, AwesomeSearchController,
              AwesomeSearchResultsController, ModalActorController, RemoteImageLoader, YearController, searchDirective,
              popularMoviesDirective, personDetailDirective, personCrewDirective,
              personCastDirective, movieDetailDirective, similarMoviesDirective,
              movieCastDirective, movieCrewDirective, moneyDirective, awesomeSearchDirective,
              awesomeSearchResultsDirective, movieTrailerDirective, yearDirective, modalActorDirective ) {
    	"use strict";

        /** @constructs app */
        var angularModules = config.standardAngularModules.concat( 'LocalStorageModule' );

        /** @constructs app */
        var app = angular.module("app", angularModules );

        //  Configure $locationProvider and $routeProvider to allow top-level navigation within this route
    	app.config(['$locationProvider', function($locationProvider) {
                            
            $locationProvider.html5Mode(false);
            
    	}]);

        app.service( "TMDBAPIService", TMDBAPIService);

        app.controller( "AwesomeSearchResultsController", AwesomeSearchResultsController );
        app.controller( "AwesomeSearchController", AwesomeSearchController );
        app.controller( "SearchController", SearchController);

        app.directive( "search", searchDirective );

        app.controller( "movieTrailerController", movieTrailerController);
        app.directive( "movieTrailer", movieTrailerDirective);

        app.controller( "HomeController", HomeController );
        app.controller( "MovieController", MovieController );

        app.controller( "TelevisionController", TelevisionController );
        app.controller( "TelevisionSeasonController", TelevisionSeasonController );
        app.controller( "TelevisionEpisodeController", TelevisionEpisodeController );

        app.controller( "PersonController", PersonController);
        app.controller( "RemoteImageLoader", RemoteImageLoader );

        app.controller("YearController", YearController);

        app.controller( "MoneyController", MoneyController );

        app.controller( "ModalActorController", ModalActorController);

        app.directive( "popularMovies", popularMoviesDirective );
        app.directive( "personDetail", personDetailDirective );
        app.directive( "personCrew", personCrewDirective );
        app.directive( "personCast", personCastDirective );
        app.directive( "movieDetail", movieDetailDirective );
        app.directive( "similarMovies", similarMoviesDirective );
        app.directive( "movieCast", movieCastDirective );
        app.directive( "movieCrew", movieCrewDirective );
        app.directive("year", yearDirective);
        app.directive("money", moneyDirective);
        app.directive( "awesomeSearchResults", awesomeSearchResultsDirective );
        app.directive( "awesomeSearch", awesomeSearchDirective );
        app.directive( "search", searchDirective );
        app.directive( "modalActor", modalActorDirective );

        app.config(['$routeProvider', function($routeProvider) {
            $routeProvider.when( '/', { templateUrl: '/tmdb/partials/home/home.html', controller: 'HomeController' } );
            $routeProvider.when( '/movie/:id', { templateUrl: '/tmdb/partials/movie/movie.html', controller: 'MovieController' } );
            $routeProvider.when( '/person/:id', { templateUrl: '/tmdb/partials/person/person.html', controller: 'PersonController' } );
            //$routeProvider.when( '/movie/:name/:id', { templateUrl: '/tmdb/partials/simpleMovie/simpleMovie.html', controller: 'SimpleMovieController' } );
            $routeProvider.when( '/movie/:id', { templateUrl: '/tmdb/partials/movie/movie.html', controller: 'MovieController' } );
            $routeProvider.when( '/television/:tvshow_id', { templateUrl: '/tmdb/partials/television/television.html', controller: 'TelevisionController' } );
            $routeProvider.when( '/television/:tvshow_id/season/:season_id', { templateUrl: '/tmdb/partials/television/television.html', controller: 'TelevisionSeasonController' } );
            $routeProvider.when( '/television/:tvshow_id/season/:season_id/episode/:episode_id', { templateUrl: '/tmdb/partials/television/television.html', controller: 'TelevisionEpisodeController' } );
            
            $routeProvider.otherwise( {
                template: function() {
                    throw 'An internal error occurred because the given path does not resolve to a known route.';
                }
            });
        }]);

    	return app;
    }
);