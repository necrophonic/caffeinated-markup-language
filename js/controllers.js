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

var syntaxReference = angular.module('syntaxReference',[]);

syntaxReference.controller('SyntaxCtrl', ['$scope','$routeParams','$http',
	function($scope,$routeParams,$http) {
		$http.get('data/syntax.json').success(function(data) {
			$scope.syntax	 = data;

		});
	}]);

syntaxReference.filter('dashIt', function() {
	return function(input) {
		return replaceSpacesWithDashes(input);
	}
});
syntaxReference.filter('hyperlinkSyntax', function() {
	return function(input) {		

		console.log("Running");

		if (input) {
			var to_be_linked;
			var output = [];
			for (var i=0; i<input.length;i++) {
				to_be_linked = input[i];
				output[i] = '<a href="#'+replaceSpacesWithDashes(to_be_linked)+'">'+to_be_linked+'</a>';
			}
			return output.join(', ');
		}	
		return "none";
	}
});


function replaceSpacesWithDashes(input) {
	console.log("Run replace on "+input);
	return input.replace(' ','-');
}