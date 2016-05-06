/**
 * AwesomeSearchController provides controller support for inline searching
 *
 * @module tmdb.partials.search.AwesomeSearchController
 *
 * @requires angular
 * @requires config
 * @requires TMDBAPIService
 *
 * @author John Gomez <jgomez@alertlogic.com>
 *
 * @returns instance of the AwesomeSearchController
 *
 * @copyright Alert Logic, Inc 2016
 *
 */

define( [ 'angular',
          'config/config',
          'tmdb/services/TMDBAPIService',
          'LocalStorageModule'],
    function( angular, config, TMDBAPIService ) {
        "use strict";

        var AwesomeSearchController = function($scope,$rootScope, TMDBAPIService, $timeout, localStorage ) {
            //Reference variables
            var self = this;
            var apiSearch = TMDBAPIService.Search();
            var apiPerson = TMDBAPIService.Person();
            var searchPromise;
            self.timeWatcher = 500;
            var limitName = 24;

            var config  = angular.module("config");
            var defaultImage = "https://simpleicon.com/wp-content/uploads/movie-1.png";

            var configuration = localStorage.get( "config") ;
            if (configuration == null)
            {
                 console.log("Route changed; looking for configuration data" );
                TMDBAPIService.getConfiguration()
                    .then(  function( configResponse ) {
                                configuration = configResponse.data;
                                console.log("Got response!", configResponse );
                                localStorage.set("config", configuration);
                            }, function( reason ) {
                                console.log("FAIL!", reason );
                            } );
                console.log("Configuration: ", configuration );
                
            }
            $scope.searchPhrase = "";

            $scope.$watch('searchPhrase',function(newValue,oldValue){
                //console.log("newValue="+newValue+",oldValue="+oldValue);
            
                $timeout.cancel(searchPromise);

                searchPromise = $timeout(function(){
                    searchPromise = undefined;
                    self.search();
                },self.timeWatcher);
            });

            $scope.performSearch = function(event) {
                if (event.which === 13) {
                    self.search();
                }
            };

            /**
            * Return the name depending on the results.
            */
            var formatName = function(data) {

                var newName = data.name || data.title;

                if (newName) {
                    if(newName.length > limitName){ 
                        return newName.substr(0, limitName)+"...";
                    }
                    return newName;
                }

                return "No name";
            };

            /**
            * Return the default image if not have a defined
            * image path.
            */
            self.getImagePath = function( path ) {
                if(path){
                    return config.apiImg + path;   
                }
                return defaultImage;  
            };

            /**
            * Call the API with the search phrase
            */
            self.search = function(){
                if ($scope.searchPhrase) {
                    if ($scope.searchPhrase.length >= 3) {
       
                        apiSearch.search.multi($scope.searchPhrase).then(function(response){

                            $scope.searchResults = response.data.results;

                            $scope.searchResults.forEach(function(item){
                                
                                if (item.media_type === "person") {
                                    // Get images for persons 
                                    apiPerson.person.person(item.id).then( function(r) {
                                        item.foto = self.getImagePath(r.data.profile_path);
                                    });
                                }
                                else {
                                    item.foto = self.getImagePath(item.poster_path);
                                }
                                item.formatName = formatName(item);
                            });

                        });
                    }
                }
            };

        };

        AwesomeSearchController.$inject = [ '$scope', '$rootScope', 'TMDBAPIService', '$timeout' , 'localStorageService'];

        return AwesomeSearchController;
    }
);