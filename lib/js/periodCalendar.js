data = new Date;
var ano;
var campo;
var idAno;
var anoString;
var calendar;
var seta;

function incrementaAno() {
	var anoString = document.getElementById(idAno).value;
	ano = parseInt(anoString);
	ano++;
	document.getElementById(idAno).value = "" + ano;
}

function decrementaAno() {
	var anoString = document.getElementById(idAno).value;
	ano = parseInt(anoString);
	ano--;
	document.getElementById(idAno).value = "" + ano;
}
function setaPeriodo(mes) {
	ano = parseInt(document.getElementById(idAno).value);
	campo.attr("value", mes + ano);
	document.getElementById(idAno).disabled = false;
	seta.fadeOut();
	calendar.fadeOut(function() {
		campo.change();
	});
}

function setaFoco(nomeCampo) {
	setTimeout(function() {
		$($(document.getElementById(nomeCampo))).focus();
		$($(document.getElementById(nomeCampo))).select();
	}, 500);
}
function configuraAno(object, idComponent) {
	campo = $(object);
	calendar = $("#popup-" + idComponent);
	seta = $("#seta-" + idComponent);
	ano = data.getFullYear();

	anoString = campo.attr('value').substring(2);
	seta.fadeIn();
	calendar.fadeIn();
	var right = campo.offset().left + calendar.width();
	$(window).width();
	if (right > $(window).width()) {
		calendar.offset({
			left : campo.offset().left - (right - $(window).width()) - 25
		});
	}
}