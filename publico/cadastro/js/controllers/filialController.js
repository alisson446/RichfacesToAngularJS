angular.module('hrcomercial').factory('filialService', function($http, config) {
	var _getFiliais = function() {
		return $http.get(config.filial + '/');
	};

	return {
		getFiliais: _getFiliais 
	}
});

angular.module('hrcomercial').controller('filialController', function($scope, filialService, paginacaoService) {
	$scope.nome = 'filiais';

	filialService.getFiliais().success(function(dados) {
		$scope.totalRegistro = dados.length;
		$scope.totalPorPagina = 10;
		$scope.pagina = paginacaoService.getPagination($scope.totalPorPagina, dados);
		$scope.filiais = $scope.pagina[0];
	
		$scope.loadListPagination = function (i) {
	    	$scope.filiais = $scope.pagina[i];
		};
	}).error(function(data,status){
		$scope.message = "Aconteceu um erro ao carregar filiais!";
	});
});