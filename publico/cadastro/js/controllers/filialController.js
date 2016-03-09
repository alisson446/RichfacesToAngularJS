angular.module('hrcomercial').factory('filialService', function($http, config) {
	var _getFiliais = function() {
		return $http.get(config.filial + '/');
	};

	return {
		getFiliais: _getFiliais 
	}
});

angular.module('hrcomercial').controller('filialController', function($scope, filialService) {
	$scope.nome = 'filiais';

	filialService.getFiliais().success(function(data) {
		var dados = data;

		$scope.totalPorPagina = 10;
		$scope.totalRegistro = dados.length;
		$scope.pagina = [];
		var j = $scope.totalRegistro > $scope.totalPorPagina ? Math.ceil($scope.totalRegistro / $scope.totalPorPagina) : $scope.totaRegistro;
		
		for (var i = 0; i < j; i++) {
		     $scope.pagina.push(dados.splice(0, $scope.totalPorPagina));
		}

		$scope.filiais = $scope.pagina[0];
		$scope.loadListPagination = function (i) {
		    $scope.filiais = $scope.pagina[i];
		};
	}).error(function(data,status){
		$scope.message = "Aconteceu um erro ao carregar filiais!";
	});
});