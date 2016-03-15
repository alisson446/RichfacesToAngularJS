angular.module("hrcomercial").factory("fornecedorService", function ($http, config){
	var _getFornecedor = function () { //"_" significa que é do tipo private
		return $http.get(config.fornecedor + "/");
	};

	var _saveFornecedor = function(fornecedor){
		return $http.post(config.fornecedor + "/", fornecedor);
	}

	var _fornecedoresSelecionado = function(id){
		return $http.get(config.fornecedor + "/" + id);
	};

	var _editarFornecedor = function(fornecedor){
		return $http.put(config.fornecedor + "/", fornecedor);
	};

	var _deletarFornecedor = function(id){
		return $http.delete(config.fornecedor + "/" + id);
	};	

	return {
		getFornecedor: _getFornecedor,
		saveFornecedor: _saveFornecedor,
		editarFornecedor: _editarFornecedor,
		deletarFornecedor: _deletarFornecedor,
		fornecedoresSelecionado: _fornecedoresSelecionado
	};
});

angular.module("hrcomercial").controller("fornecedorController", function($scope, fornecedorService, $timeout, paginacaoService){
	$scope.fornecedor = "Fornecedor";

	$scope.cadastrarFornecedor = function(fornecedor){

	};

	$scope.atualizarFornecedor = function(fornecedor){

	};

	$scope.deletarrFornecedor = function(id){

	};

	$scope.filtrarPorSelect = function(){
		var option = document.getElementById("selectSearch").value;
		if(option == "nome"){
			document.getElementById("campoBuscar").disabled = false;
			$scope.filters = 'nome';
		}else if(option == "nomeFantasia"){
			document.getElementById("campoBuscar").disabled = false;
			$scope.filters = 'nomeFantasia';
		}else if(option == "cnpj"){
			document.getElementById("campoBuscar").disabled = false;
			$scope.filters = 'cnpj';
		}else if(option == "undefinied"){
			document.getElementById("campoBuscar").disabled = true;
		}else{
			alert("Error");
		}
	};

	$scope.abrindoSearch = function(){
		if($scope.opensearch==undefined || $scope.opensearch == false){
			$scope.opensearch = true;
			if($scope.opensearch==true){
				$scope.classe = "animated fadeInLeft";
			}
		}else if($scope.opensearch == true){
			$scope.classe = "animated fadeOutLeft";	
			$timeout(function() {
				$scope.opensearch = false;
			}, 500);
		}
	};

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

	fornecedorService.getFornecedor().success(function(dados){
		$scope.totalRegistro = dados.length;
		$scope.totalPorPagina = 10;
		$scope.pagina = paginacaoService.getPagination($scope.totalPorPagina, dados);
		$scope.fornecedores = $scope.pagina[0];

		paginar($scope.atual, $scope.pagina.length);
		$scope.loadListPagination = function (i) {
	    	$scope.fornecedores = $scope.pagina[$scope.showPaginas[i]-1];
	    	$scope.atual = $scope.showPaginas[i];
	    	$scope.anterior = $scope.atual - 1;
			$scope.proxima = $scope.atual + 1;
	    	
	    	verifButtonPass($scope.atual);
		};
	}).error(function(data,status){
		$scope.message = "Aconteceu um erro ao carregar fornecedores!";
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

			$scope.fornecedores = $scope.pagina[proxima-1];
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

			$scope.fornecedores = $scope.pagina[anterior-1];
		}

		verifButtonPass($scope.atual);
	};

});