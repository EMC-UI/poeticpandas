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
    .controller('mainCtrl', ['$scope', '$interval', '$q', 'service', function ($scope, $interval, $q, service) {
        var me = this;
        $scope.selectedTeam = [];
        $scope.testTeams = ['Poetic Pandas', 'TeamOfFive', 'Other'];

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

        $scope.compete = function () {
            var winner = {};
            var winner = $scope.testTeams[Math.floor(Math.random()*$scope.testTeams.length)];
            alert( winner + " won!");

        };

        $scope.selecedItem = function(id) {
            var aTeam = angular.element('#' + id);
            var find = _.find($scope.selectedTeam, function(data) {
                return data.id == id;
            });
            if (find) {
                aTeam.removeClass('active');
                $scope.selectedTeam = _.reject($scope.selectedTeam, function(data){ return data.id == id });
            } else {
                aTeam.addClass('active');
                $scope.selectedTeam.push(_.find($scope.teamsList, function(data) {
                    return data.id == id;
                }));
            }

        };

        me.initialize();

    }]);