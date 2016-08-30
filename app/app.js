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
        
        $scope.countries = ["ad","ar","at","au","ax","bd","be","bg","br","ca","ch","cz","de","dk","do","dz","es","fi","fo","fr","gb","gf","gl","gp","gt","hr","hu","ie","in","is","it","jp","li","lk","lt","lu","mc","md","mk","mq","mt","mx","my","nl","no","nz","ph","pk","pl","pm","pt","re","ro","ru","se","si","sk","sm","th","tr","us","va","wf","yt","za","gr"];
        var geonamesUserIpCountryCode='US';

        $scope.winner = false;
        $scope.showWinner = null;
        $scope.isCompeting = false;
        $scope.readyForMedals = false;
        $scope.showRankings = null;
        $scope.selectedTeam = [];
        $scope.eliminatedTeams = [];
        $scope.sports = ['track', 'gymnastics', 'weightlifting', 'swimming', 'fencing'];
        //$scope.testTeams = ['Poetic Pandas', 'TeamOfFive', 'Suicide Squad', 'On Point', 'Memory Leaks', 'Fantastic Five', 'Caveman', 'SMAG', 'Playground'];

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
                $scope.winner = $scope.selectedTeam[Math.floor(Math.random()*$scope.selectedTeam.length)];
            }, 5000);

            $timeout(function(){
                $scope.showWinner = false;
                $scope.isCompeting = false;
                $scope.readyForMedals = false;

                var selectedtoRemove = angular.element('.active');
                //console.log('TEAMS:', selectedtoRemove);

                _.each(selectedtoRemove, function(team, i){
                   // console.log('team:', i, team);
                    // $scope.eliminatedTeams.push(team);
                    angular.element(team).removeClass('active');
                });

                console.log("winner is = " + $scope.winner.name);

                var eliminated  = _.reject($scope.selectedTeam, function(team) { return team.name === $scope.winner.name; });

                for (var i in eliminated) {
                    $scope.eliminatedTeams.push(eliminated[i]);
                }


                // then remove eliminated from teamslist

                $scope.remaining = _.difference($scope.teamsList,eliminated);
                console.log($scope.remaining);
                $scope.teamsList = $scope.remaining;
                var winnerIndex = _.findIndex($scope.teamsList, function (t) { return t.name === $scope.winner.name;});
                $scope.teamsList[winnerIndex].wins = parseInt($scope.teamsList[winnerIndex].wins) + 1;
                console.log('wins after =', $scope.teamsList[winnerIndex].wins);

                        // selectedtoRemove.forEach(function( toRemove) {
                //        toRemove.removeClass('active');
                //    });

                $scope.selectedTeam = [];


            }, 10000);

            $timeout( function(){
                // the one team remaining gets the GOLD
                if ($scope.teamsList.length == 1) {
                    console.log('ready for closing ceremony')
                    $scope.readyForMedals = true;
                    $scope.showMedals = true;

                    var audio = new Audio('/app/img/theme.mpg3');
                    audio.play();

                    }
                }, 11000);

        };

        $scope.selecedItem = function(id) {
            var aTeam = angular.element('#' + id);
            if (!aTeam && !aTeam[0] && !aTeam[0].children[1]) {return;}
            if (aTeam[0].children[1].children.length == 0 ) {
                // message box
                alert("Hello! Please Drag and Drop the players into Team!!");
                return;
            }
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