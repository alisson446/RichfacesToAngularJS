angular.module("hrcomercial").factory("gruposService", function ($http, config){
	var _getGrupos = function () { //"_" significa que é do tipo private
		return $http.get(config.url + "/");
	};

	var _getFluxodecaixa = function() {
		return $http.get(config.fluxodecaixa + "/");
	};

	var _saveGrupo = function(grups){
		return $http.put(config.url + "/", grups);
	}

	return {
		getGrupos: _getGrupos,
		getFluxodecaixa: _getFluxodecaixa,
		saveGrupo: _saveGrupo
	};
});

angular.module('hrcomercial').controller('grupoCtrl', function($scope, gruposService, $location) {
	$scope.redirecionar = $location.path();
	$scope.nome = "Grupos";

	var carregarGrupos = function(){
		gruposService.getGrupos().success(function(data){
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

	var carregarSelectFluxo = function(){
		gruposService.getFluxodecaixa().success(function(data){
			$scope.fluxos = data;
		}).error(function(data,status){
			$scope.message = "Aconteceu um erro ao carregar fluxos!";
		});
	};

	$scope.cadastrarGrupo = function(grupos){
		var objetoGrupo = { 
			codigo: grupos.codigo, descricao:grupos.descricao, abreviacao: grupos.abreviacao, 
			descontomax: grupos.descontomax, markup: grupos.markup, observacao: grupos.observacao,
			radioimobilizado: grupos.radioimobilizado, radioinventario: grupos.radioinventario,
			tipo:grupos.tipo, aliquota:grupos.aliquota, classfiscal: grupos.classfiscal,
			classificacaodespesa: grupos.classificacaodespesa.codigoFluxo + ' - ' + grupos.classificacaodespesa.descricao,
			classificacaoreceita: grupos.classificacaoreceita.codigoFluxo + ' - ' + grupos.classificacaoreceita.descricao,
			comissao: grupos.comissao};

		gruposService.saveGrupo(objetoGrupo).success(function(data){
			$scope.grupo = null;
			$('#modalGrupos').foundation('reveal', 'close');
		}).error(function(data,status){
			$scope.message = "Aconteceu um erro ao salvar grupo!";
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
	carregarSelectFluxo();

});
