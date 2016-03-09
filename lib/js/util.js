/**
 * Verifica a existencia da classe em um objeto HTML
 */
function hasClass(element, cls) {
	return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

/**
 * Redireciona a p�gina para a URL especificada
 */
function href(url, object) {
	if (!hasClass(object, 'disabled')) {
		window.document.location.href = url;
	}
}

/**
 * Seta foco no elemento escolhido
 */
function setaFoco(nomeCampo) {
	document.getElementById(nomeCampo).focus();
}

/**
 * Executa a ação do elemento escolhido
 */
function executarAcao(nomeCampo) {
	$($(document.getElementById(nomeCampo))).click();
}


/**
 * Troca ponto por virgula
 */
function trocarPontoPorVirgula(campoID) {
	var campo = document.getElementById(campoID);
	campo.value = campo.value.replace('.', ',');
}

/**
 * Troca virgula por ponto
 */
function trocarVirgulaPorPonto(campoID) {
	var campo = document.getElementById(campoID);
	campo.value = campo.value.replace(',', '.');
}