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
		$scope.opensearch = !$scope.opensearch;
		if($scope.opensearch==true){
			$scope.classe = "animated fadeInLeft";
		}else{
			$scope.opensearch==false;
			$scope.classe = "animated fadeInRight";
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

	carregarGrupos();
	carregarSelectFluxo();

});
