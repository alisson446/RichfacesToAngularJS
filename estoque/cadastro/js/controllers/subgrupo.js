angular.module('single').controller('subgrupo', function($scope, $location) {
	$scope.redirecionar = $location.path();
	$scope.sub = "Subs"
});