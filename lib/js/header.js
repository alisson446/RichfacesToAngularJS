dentroDivUser = false;
dentroDivOptions = false;

/**
 * Função que mostra ou esconde o menu de express
 */
function showExpress() {
	var menu = document.getElementById("menuIcon");
	if (hasClass(menu, "arrow")) {
		menu.className = "material-icon hamburger";
	} else {
		menu.className = "material-icon arrow";
	}
}

/**
 * Função que mostra ou esconde as opções do usuário ou do sistema
 */
function showOptions(classe) {
	var menu = $("." + classe);
	if (menu.attr("active") == "true") {
		menu.attr("active", false);
		menu.slideUp("fast");
	} else {
		menu.attr("active", true);
		menu.slideDown("fast");
	}
}
$(function() {
	$(document).on("click", function(e) {
		if (dentroDivUser == false) {
			$(".userOptions").slideUp("fast");
			$(".userOptions").attr("active", false);
		}
		if (dentroDivOptions == false) {
			$(".sysOptions").slideUp("fast");
			$(".sysOptions").attr("active", false);
		}
	});
});