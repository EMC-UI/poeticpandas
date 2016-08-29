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
    .controller('mainCtrl', ['$scope', '$interval', '$timeout', '$q', 'service', function ($scope, $interval, $timeout, $q, service) {
        var me = this;

        $scope.winner = false;
        $scope.showWinner = null;
        $scope.isCompeting = false;
        $scope.selectedTeam = []
        $scope.sports = ['track', 'gymnastics', 'weightlifting', 'swimming', 'fencing'];
        $scope.testTeams = ['Poetic Pandas', 'TeamOfFive', 'Suicide Squad', 'On Point', 'Memory Leaks', 'Fantastic Five', 'Caveman', 'SMAG', 'Playground'];

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
            		
            		$scope.teamsList[index].players = [];
            		
            	})
            	console.log(data);
            }, function(responze) {
                console.log('error');
            });

        };

        $scope.compete = function () {
            $scope.isCompeting = true;

            $scope.theSport = $scope.sports[Math.floor(Math.random()*$scope.sports.length)];

            var winner = {};
            $timeout(function(){
                $scope.showWinner = true;
                $scope.winner = $scope.testTeams[Math.floor(Math.random()*$scope.testTeams.length)];
               //  $scope.winner = $scope.teamsList[Math.floor(Math.random()*$scope.teamsList.length)];
            }, 5000);
          //  alert( winner + " won!");
            $timeout(function(){
                $scope.showWinner = false;
                $scope.isCompeteing = false;
            }, 7000);
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