var nextFunc = function() {
	return null;
};
var prevFunc = function() {
	return null;
};
var enterFunc = function() {
	return null;
};
var escFunc = function() {
	return null;
};


function showFindContainer() {
	$(".findContainer").toggle("slide");
}
$(document).ready(function() {
	setIconDataScroller();
});

function abriCalendario(objeto) {
	$(objeto).datepicker(
			{
				dateFormat : 'dd/mm/yy',
				dayNames : [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta',
						'Sexta', 'Sábado' ],
				dayNamesMin : [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D' ],
				dayNamesShort : [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex',
						'Sáb', 'Dom' ],
				monthNames : [ 'Janeiro', 'Fevereiro', 'Março', 'Abril',
						'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
						'Outubro', 'Novembro', 'Dezembro' ],
				monthNamesShort : [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
						'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
				nextText : 'Próximo',
				prevText : 'Anterior',
				regional : 'pt-BR',
				onSelect : function(datetext) {
					datetext = datetext + $(this).attr("alt");
					$(this).val(datetext);
					$(this).change();

				}
			});
	$(objeto).datepicker("show");
}


function configarTabPanel(tabPanel) {
	tabPanel.switchToItem(tabPanel.firstItem());
	nextFunc = function() {
		tabPanel.switchToItem(tabPanel.nextItem());
	};
	prevFunc = function() {
		tabPanel.switchToItem(tabPanel.prevItem());
	};
}


function setDefaultShortcuts() {
	nextFunc = function() {
		return null;
	};
	prevFunc = function() {
		return null;
	};
	enterFunc = function() {
		return null;
	};
	escFunc = function() {
		return null;
	};
}


document.addEventListener("keydown", function(event) {
	//Seta para direita
	if (event.ctrlKey && event.keyCode == 39) {
		nextFunc();
		event.preventDefault();
	} 
	//Seta para esquerda
	if (event.ctrlKey && event.keyCode == 37){
		prevFunc();
		event.preventDefault();
	}
});