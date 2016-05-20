var syntaxReference = angular.module('syntaxReference',[]).config(function($httpProvider) {delete $httpProvider.defaults.headers.common['X-Requested-With'];});

syntaxReference.controller('SyntaxCtrl', ['$scope','$routeParams','$http',
	function($scope,$routeParams,$http) {
		$http.get('spec/1.0.0/spec.json').success(function(data) {
			$scope.syntax	 = data;
		});
	}]);

syntaxReference.filter('dashIt', function() {
	return function(input) {
		return replaceSpacesWithDashes(input);
	}
});

// Automatically turns "can contain" notes into hyperlinks to the actual section
syntaxReference.filter('hyperlinkSyntax', function() {
	return function(input) {
		if (input) {
			var to_be_linked;
			var output = [];
			for (var i=0; i<input.length;i++) {
				to_be_linked = input[i];
				if (to_be_linked == "any") {
					return '<a href="#syntax">any</a>';
				}
				output[i] = '<a href="#'+replaceSpacesWithDashes(to_be_linked)+'">'+to_be_linked+'</a>';
			}
			return output.join(', ');
		}
		return "none";
	}
});

function replaceSpacesWithDashes(input) {
	return input.replace(' ','-');
}
