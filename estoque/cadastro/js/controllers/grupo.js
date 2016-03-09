angular.module("hrcomercial").factory("grupos", function ($http, config){
	var _getGrupos = function () { //"_" significa que é do tipo private
		return $http.get(config.url + "/");
	};

	return {
		getGrupos: _getGrupos
	};
});

angular.module('hrcomercial').controller('grupoCtrl', function($scope, grupos, $location) {
	$scope.redirecionar = $location.path();
	$scope.nome = "Grupos";

	var carregarGrupos = function(){
		grupos.getGrupos().success(function(data){
			var dados = data;

			$scope.totalPorPagina = 10;
			$scope.totalRegistro = dados.length;
			$scope.pagina = [];
			var j = $scope.totalRegistro > $scope.totalPorPagina ? Math.ceil($scope.totalRegistro / $scope.totalPorPagina) : $scope.totaRegistro;
			for (var i = 0; i < j; i++) {
			     $scope.pagina.push(dados.splice(0, $scope.totalPorPagina));
			}
			$scope.lista = $scope.pagina[0];
			$scope.loadListPagination = function (i) {
			    $scope.lista = $scope.pagina[i];
			};
		}).error(function(data,status){
			$scope.message = "Aconteceu um erro ao carregar grupos!";
		});
	};

	$scope.openModalGrupo = function(){
		$('#modalGrupos').foundation('reveal', 'open');
		$scope.abaIdent = "active";
		$scope.abaClass = "";
		$scope.activeIdent = "active";
		$scope.activeClass = "";
	};

	$scope.fecharModal = function(){
		$('#modalGrupos').foundation('reveal', 'close');
		$scope.grupo = null;
	};

	$scope.abaIdentificacao = function(){
		$scope.abaIdent = "active";
		$scope.abaClass = "";
		$scope.activeIdent = "active";
		$scope.activeClass = "";
	};

	$scope.abaClassificacao = function(){
		$scope.abaClass = "active";
		$scope.abaIdent = "";
		$scope.activeIdent = "";
		$scope.activeClass = "active";
	};

	carregarGrupos();

});
