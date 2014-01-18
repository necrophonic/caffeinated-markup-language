var stateMachine = angular.module('stateMachine',[]);

stateMachine.controller('StatesCtrl', ['$scope', '$routeParams', '$http',
	function($scope,$routeParams,$http) {
		$http.get('data/states.json').success(function(data) {
			$scope.states = data;



			/* Post process data to add hyperlinks */
			
			var rules;
			var state_name;
			for (var i = 0; i < $scope.states.length; i++) {

				rules = $scope.states[i].rules;
				
				for (var j = 0; j < rules.length; j++) {
					for (var k = 0; k < rules[j].actions.length; k++) {

						/* Loop through all states - TODO this isn't efficient */
						for (var m = 0; m < $scope.states.length; m++) {
							state_name = $scope.states[m].state_name;
							rules[j].actions[k]
								= rules[j].actions[k].replace(
										' ' + state_name  + ' state',
										' <a href="#'+state_name+'-state">'+state_name+'</a> state'
									);
						}
					}
				}
			}
			

			
		});
	}]);