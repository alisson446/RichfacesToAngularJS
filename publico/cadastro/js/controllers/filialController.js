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
	$scope.showPaginas = []; 
	$scope.proxima = 2;
	$scope.atual = 1;
	$scope.anterior = 0;

	$scope.prevDisable = true;
	$scope.nextDisable = false;

	var paginar = function(atual, length) {
		for(var i=0; i<length;i++) {
			$scope.showPaginas[i] = atual+i;
	 	}
	};	

	filialService.getFiliais().success(function(dados) {
		$scope.totalRegistro = dados.length;
		$scope.totalPorPagina = 10;
		$scope.pagina = paginacaoService.getPagination($scope.totalPorPagina, dados);
		$scope.filiais = $scope.pagina[0];

		paginar($scope.atual, $scope.pagina.length);
		$scope.loadListPagination = function (i) {
	    	$scope.filiais = $scope.pagina[$scope.showPaginas[i]-1];
	    	$scope.atual = $scope.showPaginas[i];
	    	$scope.anterior = $scope.atual - 1;
			$scope.proxima = $scope.atual + 1;
	    	
	    	verifButtonPass($scope.atual);
		};
	}).error(function(data,status){
		$scope.message = "Aconteceu um erro ao carregar filiais!";
	});

	var verifButtonPass = function(atual) {
		$scope.anterior = atual-1;
		$scope.proxima = atual+1;

		$scope.prevDisable = $scope.anterior > 0 ? false : true;
		$scope.nextDisable = $scope.proxima <= $scope.pagina.length ? false : true;
	}

	$scope.nextPage = function(proxima) {
		if($scope.atual < $scope.pagina.length) {
			$scope.atual = $scope.atual + 1;
			$scope.anterior = $scope.anterior + 1;
			$scope.proxima = proxima + 1;

			if(proxima < $scope.pagina.length) {
				for(var i=0; i<$scope.pagina.length; i++) {
					$scope.pagina[i] = $scope.pagina[i];
				}
				paginar(proxima-1, $scope.pagina.length);
			}

			$scope.filiais = $scope.pagina[proxima-1];
		}

		verifButtonPass($scope.atual);
	};

	$scope.prevPage = function(anterior) {
		if(anterior>0) {
			$scope.atual = $scope.atual-1;
			$scope.anterior = anterior-1;
			$scope.proxima = $scope.proxima-1;

			if(anterior==1) {
				paginar(anterior, $scope.pagina.length);
			}

			if(anterior>1) {
				for(var i=0; i<$scope.pagina.length; i++) {
					$scope.pagina[i] = $scope.pagina[i];
				}
				paginar(anterior-1, $scope.pagina.length);
			}

			$scope.filiais = $scope.pagina[anterior-1];
		}

		verifButtonPass($scope.atual);
	};

	/*$scope.openModal = function(){
		$('#modalFilial').foundation('reveal', 'open');
		$scope.abaIdent = "active";
		$scope.abaClass = "";
		$scope.abaOutros = "";
		$scope.abaPdv = "";
	};

	$scope.fecharModal = function(){
		$('#modalFilial').foundation('reveal', 'close');
		$scope.grupo = null;
	};

	$scope.abaIdentificacao = function(){
		$scope.abaIdent = "active";
		$scope.abaClass = "";
		$scope.abaOutros = "";
		$scope.abaPdv = "";
	};

	$scope.abaClassificacao = function(){
		$scope.abaIdent = "";
		$scope.abaClass = "active";
		$scope.abaOutros = "";
		$scope.abaPdv = "";
	};

	$scope.abaOthers = function(){
		$scope.abaIdent = "";
		$scope.abaClass = "";
		$scope.abaOutros = "active";
		$scope.abaPdv = "";
	};

	$scope.abaPDV = function(){
		$scope.abaIdent = "";
		$scope.abaClass = "";
		$scope.abaOutros = "";
		$scope.abaPdv = "active";
	};*/
});