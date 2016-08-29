'use strict';

angular.module('app', ['ngMessages', 'ngDragDrop'])
    .run(['$rootScope', '$interval', function($rootScope, $interval) {

    }])

    .factory('service', [ '$http', function ($http) {

        var getPlayers = function(token) {
            return $http.get('/players');
        };
        var getTeams = function(token) {
            return $http.get('/teams');
        };
        return {
            getPlayers : getPlayers,
            getTeams : getTeams
        };
    }])
    .controller('mainCtrl', ['$scope', '$interval', '$parse','$q', 'service', function ($scope, $interval, $parse, $q, service) {
        var me = this;
        
        $scope.optionsList = {
    			accept: function(dragEl) {
    				if ($scope.playersList.length >= 2) {
    					return false;
    				} else {
    					return true;
    				}
    			}
    	};

        var playersPromise = null, teamsPromise = null;
        this.initialize = function () {
            playersPromise = service.getPlayers();
            $q.when(playersPromise).then(function(data){
            	$scope.playersList = data.data.players;
                console.log(data);
            }, function(responze) {
                console.log('error');
            });
            teamsPromise = service.getTeams();
            $q.when(teamsPromise).then(function(data){
            	$scope.teamsList = data.data.teams;
            	
            	angular.forEach( $scope.teamsList,function(team,index){
            			
            		$scope[team.id] = [];
            		
                })
            	
                console.log(data);
            }, function(responze) {
                console.log('error');
            });

        };
        me.initialize();

    }]);