angular.module('hrcomercial').factory('paginacaoService', function() {
	
	var _getPagination = function(totalPorPagina, dados) {
		var totalRegistro = dados.length;
		var pagina = [];
		var j = totalRegistro > totalPorPagina ? Math.ceil(totalRegistro / totalPorPagina) : totaRegistro;
		
		for (var i = 0; i < j; i++) {
		     pagina.push(dados.splice(0, totalPorPagina));
		}

		return pagina;
	};

	return {
		getPagination: _getPagination
	}
});