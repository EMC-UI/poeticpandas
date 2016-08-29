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
    	$scope.list1 = [];
    	$scope.list2 = [];
    	$scope.list3 = [];
    	$scope.list4 = [];
    	$scope.list5 = [];

        var playersPromise = null, teamsPromise = null;
        this.initialize = function () {
            playersPromise = service.getPlayers();
            $q.when(playersPromise).then(function(data){
            	$scope.playersList = data.data.people;
                console.log(data);
            }, function(responze) {
                console.log('error');
            });
            teamsPromise = service.getTeams();
            $q.when(playersPromise).then(function(data){
            	$scope.teamsList = data;
                console.log(data);
            }, function(responze) {
                console.log('error');
            });

        };
        me.initialize();

    }]);