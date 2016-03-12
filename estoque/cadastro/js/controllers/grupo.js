angular.module("hrcomercial").factory("gruposService", function ($http, config){
	var _getGrupos = function () { //"_" significa que é do tipo private
		return $http.get(config.url + "/");
	};

	var _getFluxodecaixa = function() {
		return $http.get(config.fluxodecaixa + "/");
	};

	var _saveGrupo = function(grups){
		return $http.post(config.url + "/", grups);
	}

	var _gruposSelecionado = function(id){
		return $http.get(config.url + "/" + id);
	};

	var _editarGrupo = function(grups){
		return $http.put(config.url + "/", grups);
	};

	var _deletarGrupo = function(id){
		return $http.delete(config.url + "/" + id);
	};	

	return {
		getGrupos: _getGrupos,
		getFluxodecaixa: _getFluxodecaixa,
		saveGrupo: _saveGrupo,
		editarGrupo: _editarGrupo,
		deletarGrupo: _deletarGrupo,
		gruposSelecionado: _gruposSelecionado
	};
});

angular.module('hrcomercial').controller('grupoCtrl', function($scope, gruposService, $location, $timeout, paginacaoService) {
	$scope.redirecionar = $location.path();
	$scope.nome = "Grupos";

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

	gruposService.getGrupos().success(function(dados) {
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
			$('#modalGrupos').foundation('reveal', 'close');
			$scope.grupo = null;
		}).error(function(data,status){
			$scope.message = "Aconteceu um erro ao salvar grupo!";
		});	

	};	

	$scope.atualizarGrupo = function(grupo){
		gruposService.editarGrupo(grupo).success(function (data){
			$('#modalEditarGrupos').foundation('reveal', 'close');
			carregarGrupos();
		});
	};

	$scope.deletarGrupo = function(id){
		gruposService.deletarGrupo(id).success(function(data){
			carregarGrupos();
		});
	};

	$scope.openModalGrupo = function(screen, id){
		if(screen == "cadastrar"){
			$('#modalGrupos').foundation('reveal', 'open');
			$scope.abaIdent = "active";
			$scope.abaClass = "";
			$scope.activeIdent = "active";
			$scope.activeClass = "";			
		}else if(screen == "editar"){
			$('#modalEditarGrupos').foundation('reveal', 'open');
			$scope.abaEditIdent = "active";
			$scope.abaEditClass = "";
			$scope.activeEditIdent = "active";
			$scope.activeEditClass = "";	
			gruposService.gruposSelecionado(id).success(function(data){
				$scope.grupoedit = data;
			});
		}else {
			alert("Deu erro");
		}
		
	};

	$scope.fecharModal = function(){
		$('#modalGrupos').foundation('reveal', 'close');
		$scope.grupo = null;
	};

	$scope.filtrarPorSelect = function(){
		var option = document.getElementById("selectSearch").value;
		if(option == "codigo"){
			document.getElementById("campoBuscar").disabled = false;
			$scope.filters = 'grupo';
		}else if(option == "descricao"){
			document.getElementById("campoBuscar").disabled = false;
			$scope.filters = 'descricao';
		}else if(option == "abreviacao"){
			document.getElementById("campoBuscar").disabled = false;
			$scope.filters = 'abreviacao';
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

	$scope.abaEditIdentificacao = function(){
		$scope.abaEditIdent = "active";
		$scope.abaEditClass = "";
		$scope.activeEditIdent = "active";
		$scope.activeEditClass = "";
	};

	$scope.abaEditClassificacao = function(){
		$scope.abaEditIdent = "";
		$scope.abaEditClass = "active";
		$scope.activeEditIdent = "";
		$scope.activeEditClass = "active";
	};

	carregarSelectFluxo();

});
