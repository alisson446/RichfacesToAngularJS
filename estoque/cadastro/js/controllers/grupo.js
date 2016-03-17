angular.module("hrcomercial").factory("gruposService", function ($http, config){
	var _getGrupos = function () { //"_" significa que é do tipo private
		return $http.get(config.url + "/");
	};

	var _getFluxodecaixa = function() {
		return $http.get(config.fluxodecaixa + "/");
	};

	var _getTipoDeProduto = function(){
		return $http.get(config.itemtabelagenerica + "/TP");
	};

	var _getAliquota = function(){
		return $http.get(config.itemtabelagenerica + "/IF");
	};

	var _getComissao = function(){
		return $http.get(config.itemtabelagenerica + "/CV");
	};

	var _saveGrupo = function(grups){
		return $http.post(config.url + "/", grups);
	}

	var _gruposSelecionado = function(id){
		return $http.get(config.url + "/" + id);
	};

	var _editarGrupo = function(id, grups){
		return $http.put(config.url + "/" + id, grups);
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
		gruposSelecionado: _gruposSelecionado,
		getTipoDeProduto: _getTipoDeProduto,
		getAliquota:_getAliquota,
		getComissao:_getComissao
	};
});

angular.module('hrcomercial').controller('grupoCtrl', function($scope, gruposService, $location, $timeout, paginacaoService) {
	$scope.redirecionar = $location.path();
	$scope.nome = "Grupos";
	var carregarGrupos = function(){
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
	};

	var carregarSelectFluxo = function(){
		gruposService.getFluxodecaixa().success(function(data){
			$scope.fluxos = data;
		});
	};

	var carregarItemTabela = function(){
		gruposService.getTipoDeProduto().success(function(data){
			$scope.apendices = data;
		});
	};

	var carregarAliquota = function(){
		gruposService.getAliquota().success(function(data){
			$scope.aliquotas = data;
		});
	};

	var carregarComissao = function(){
		gruposService.getComissao().success(function(data){
			$scope.comissoes = data;
			$scope.comissoes
		});
	};

	$scope.cadastrarGrupo = function(grupos){
		var objetoGrupo = { 
			"grupo": grupos.grupo, "descricao":grupos.descricao, "abreviacao": grupos.abreviacao, 
			"descontoMaximo": grupos.descontoMaximo, "markupPadrao": grupos.markupPadrao, "observacao": grupos.observacao,
			"isImobilizado": grupos.isImobilizado, "isInventario": grupos.isInventario, "tipoProduto":grupos.tipoProduto, 
			"aliquotaImpressoraFiscal":grupos.aliquotaImpressoraFiscal, "classfiscal": grupos.classfiscal, "fluxoSaida": grupos.fluxoSaida, 
			"fluxoEntrada": grupos.fluxoEntrada, "comissao": grupos.comissao, "tabelaCV": "CV", "tabelaTP": "TP", "tabelaIF": "IF"};

		gruposService.saveGrupo(objetoGrupo).success(function(data){
			$('#modalGrupos').foundation('reveal', 'close');
			carregarGrupos();
			$scope.grupo = null;
		}).error(function(data,status){
			$scope.message = "Aconteceu um erro ao salvar grupo!";
		});	

	};	

	$scope.atualizarGrupo = function(grupos){
		var objetoGrupoEdit = { 
			"grupo": grupos.grupo, "descricao":grupos.descricao, "abreviacao": grupos.abreviacao, 
			"descontoMaximo": grupos.descontoMaximo, "markupPadrao": grupos.markupPadrao, "observacao": grupos.observacao,
			"isImobilizado": grupos.isImobilizado, "isInventario": grupos.isInventario, "tipoProduto":grupos.tipoProduto, 
			"aliquotaImpressoraFiscal":grupos.aliquotaImpressoraFiscal, "classfiscal": grupos.classfiscal, "fluxoSaida": grupos.fluxoSaida, 
			"fluxoEntrada": grupos.fluxoEntrada, "comissao": grupos.comissao, "tabelaCV": "CV", "tabelaTP": "TP", "tabelaIF": "IF"};

		gruposService.editarGrupo(objetoGrupoEdit.grupo, objetoGrupoEdit).success(function (data){
			$scope.grupoedit = data;
		});
		location.reload(); 		
	};

	$scope.deletarGrupo = function(id){
		gruposService.deletarGrupo(id).success(function(data){
			$('#modalExcluir').foundation('reveal', 'close');
			carregarGrupos();
		});
	};

	$scope.show = function(screen, id){
		$scope.grupoedit = null;
		if(screen == "cadastrar"){
			$scope.titleModal = "Adicionar";
			$('#modalGrupos').foundation('reveal', 'open');
			$scope.abaEditIdent = "active";
			$scope.abaEditClass = "";
			$scope.activeEditIdent = "active";
			$scope.activeEditClass = "";				
		}else if(screen == "editar"){
			$scope.titleModal = "Editar";
			$('#modalGrupos').foundation('reveal', 'open');
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

	$scope.openModalExcluir = function(descricao, id){
		$('#modalExcluir').foundation('reveal', 'open');
		$scope.gruporemove = descricao;
		$scope.grupoid = id;
	};

	$scope.closeExcluir = function(){
		$('#modalExcluir').foundation('reveal', 'close');
	};

	$scope.fecharModalEdit = function(){
		$('#modalEditarGrupos').foundation('reveal', 'close');
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
	carregarGrupos();
	carregarItemTabela();
	carregarAliquota();
	carregarComissao();

});
