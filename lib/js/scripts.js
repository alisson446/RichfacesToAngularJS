//Consultar endere�o por CEP - Modal Novo
function getEndereco() {
	// Se o campo CEP n�o estiver vazio
	if ($.trim($("#cep").val()) != "") {
		/*
		 * Para conectar no servi�o e executar o json, precisamos usar a
		 * fun��o getScript do jQuery, o getScript e o dataType:"jsonp"
		 * conseguem fazer o cross-domain, os outros dataTypes n�o
		 * possibilitam esta intera��o entre dom�nios diferentes Estou
		 * chamando a url do servi�o passando o par�metro
		 * "formato=javascript" e o CEP digitado no formul�rio
		 * http://cep.republicavirtual.com.br/web_cep.php?formato=javascript&cep="+$("#cep").val()
		 */
		$
				.getScript(
						"http://cep.republicavirtual.com.br/web_cep.php?formato=javascript&cep="
								+ $("#cep").val(),
						function() {
							// o getScript d� um eval no script, ent�o �
							// s� ler!
							// Se o resultado for igual a 1

							if (resultadoCEP["tipo_logradouro"] != '') {
								if (resultadoCEP["resultado"]) {
									// troca o valor dos elementos
									$("#rua")
											.val(
													unescape(resultadoCEP["tipo_logradouro"])
															+ " "
															+ unescape(resultadoCEP["logradouro"]));
									$("#bairro").val(
											unescape(resultadoCEP["bairro"]));
									$("#cidade").val(
											unescape(resultadoCEP["cidade"]));
									$("#estado").val(
											unescape(resultadoCEP["uf"]));
									$("#numero").focus();
								}
							}
						});
	}
}

function pessoa(tipo) {
	if (tipo == "fisica") {

		document.getElementById("cpf").style.display = "inline";
		document.getElementById("cnpj").style.display = "none";
		document.getElementById("ie").style.display = "none";
		document.getElementById("rg").style.display = "inline";
		document.getElementById("espacoform").style.display = "inline";

	} else if (tipo == "juridica") {

		document.getElementById("cpf").style.display = "none";
		document.getElementById("cnpj").style.display = "inline";
		document.getElementById("ie").style.display = "inline";
		document.getElementById("rg").style.display = "none";
		document.getElementById("espacoform").style.display = "none";
	}
}

// Indentificar Pessoa na cria��o
function pessoa2(tipo) {

	if (tipo == "fisica2") {

		document.getElementById("cpf2").style.display = "inline";
		document.getElementById("cnpj2").style.display = "none";
		document.getElementById("ie2").style.display = "none";
		document.getElementById("rg2").style.display = "inline";
		document.getElementById("espacoform2").style.display = "inline";

	} else if (tipo == "juridica2") {

		document.getElementById("cpf2").style.display = "none";
		document.getElementById("cnpj2").style.display = "inline";
		document.getElementById("ie2").style.display = "inline";
		document.getElementById("rg2").style.display = "none";
		document.getElementById("espacoform2").style.display = "none";

	}

}

function formataNumero() {
	var tecla = window.event.keyCode;

	if (tecla >= 48 && tecla <= 57) {
		return true;
	} else {
		return false;
	}
}

function formataDouble() {
	var tecla = window.event.keyCode;

	if ((tecla >= 48 && tecla <= 57) || tecla == 44) {
		return true;
	} else {
		return false;
	}
}
