angular.module("hrcomercial").factory("subgruposService", function ($http, config){
	var _getSubgrupos = function () { //"_" significa que é do tipo private
		return $http.get(config.subgrupo + "/");
	};

	var _saveSubgrupo = function(subgrups){
		return $http.post(config.subgrupo + "/", subgrups);
	}

	var _subgruposSelecionado = function(id){
		return $http.get(config.subgrupo + "/" + id);
	};

	var _editarSubgrupo = function(subgrups){
		return $http.put(config.subgrupo + "/", subgrups);
	};

	var _deletarSubgrupo = function(id){
		return $http.delete(config.subgrupo + "/" + id);
	};	

	return {
		getSubgrupos: _getSubgrupos,
		saveSubgrupo: _saveSubgrupo,
		editarSubgrupo: _editarSubgrupo,
		deletarSubgrupo: _deletarSubgrupo,
		subgruposSelecionado: _subgruposSelecionado
	};
});

angular.module('hrcomercial').controller('subgrupoController', function($scope, $location, subgruposService) {
	$scope.redirecionar = $location.path();
	$scope.sub = "SubGrupo";

	var carregarSubgrupo = function(){
		subgruposService.getSubgrupos().success(function(data){
			$scope.subgrupos = data;
		}).error(function(data){
			$scope.message = "Aconteceu um erro ao carregar subgrupos!";
		});
	};

	carregarSubgrupo();
});