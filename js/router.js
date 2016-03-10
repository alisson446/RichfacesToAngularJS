angular.module('hrcomercial', ['ngRoute']).config(function($routeProvider) {
	$routeProvider
		.when('/publico/filial', {
			templateUrl: 'publico/cadastro/views/filial.html',
			controller: 'filialController'
		})

		.when('/grupo', {
			templateUrl: 'estoque/cadastro/views/grupo.html',
			controller: 'grupoCtrl'
		})

		.when('/subgrupo', {
			templateUrl: 'estoque/cadastro/views/subgrupo.html',
			controller: 'subgrupo'
		})

		.otherwise({redirectTo: '/'});
});