	function hasClass(ele, cls) {
		return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	}

	function addClass(ele, cls) {
		if (!hasClass(ele, cls))
			ele.className += " " + cls;
	}
	
	function addClassAnyElem(eleID, cls) {
		try{
			var elem = document.getElementById(eleID);
			if (!hasClass(elem, cls))
				elem.className += " " + cls;			
		}catch(e){}		
	}

	function removeClass(ele, cls) {
		if (hasClass(ele, cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			ele.className = ele.className.replace(reg, ' ');
		}
	}
	
	function removeClassAnyElem(eleID, cls) {
		var elem = document.getElementById(eleID);
		if (hasClass(elem, cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			elem.className = elem.className.replace(reg, ' ');
		}
	}

	/* Mostrar Backdrop nuevo menú (fondo negro)*/
	function showBack() {
		try{
		var ele = document.getElementById('backdropID');
		var evt = document.getElementById('evtHandlerBack');
		addClass(ele, 'show');
		addClass(evt, 'show');
		}catch(e){}
	}
	
	/* Esconder Backdrop nuevo menú (fondo negro)*/
	function hideBack(){
		try{
		var ele = document.getElementById('backdropID');
		var evt = document.getElementById('evtHandlerBack');
		removeClass(ele,'show');
		removeClass(evt,'show');
		}catch (e){}		
	}
	
	/* Metodo para abrir tab */
	function openTab(evt, tabName) {
		var i, tabcontenido, tablist, tabsActive;
		tabcontenido = document.getElementsByClassName("tabcontenido");
		for (i = 0; i < tabcontenido.length; i++) {
			tabcontenido[i].style.display = "none";
		}

		tablist = document.getElementsByClassName("tablist");
		for (i = 0; i < tablist.length; i++) {
			tablist[i].className = tablist[i].className.replace(" active", "");
		}

		tabsActive = document.getElementsByClassName(tabName);
		for (i = 0; i < tabsActive.length; i++) {
			tabsActive[i].style.display='block';
		}

		evt.currentTarget.className += " active";
	}
	
	// "Toggle Class"
	function toggleClass(element, className) {
		try{
			if (!element || !className) { return; }
			var classString = element.className, nameIndex = classString.indexOf(className);
			if (nameIndex == -1) {
				classString += (classString.length) ? ' ' + className : className;
			} else {
				classString = classString.replace(' ' + className, '');
				classString = classString.replace(className, '');
			}
			element.className = classString;
		}catch (e){}
	}
	/**
	 * Modifica el ancho del tooltips sobre 22 caracteres
	 */
	function tooltip(){
		try{
			var tooltips = document.getElementsByClassName("inew-tooltiptext");
			for (var i = tooltips.length - 1; i >= 0; --i) {
				var tooltipCount = tooltips[i].innerHTML.length;
				if (tooltipCount > 22){
					tooltips[i].className = "inew-tooltiptext inew-tooltipLarge";
				}
			}
		}catch (e){}	
	}
	/**
	 * Genera acordeon
	 * Acordeon (incluye funcionamiento desde ie9)
	 */
	function addAccordeon(){
		try{
			var accBtn = document.getElementsByClassName("icon-itaufonts_seta_achatada");
			for (var i = 0;  i < accBtn.length; i++) {
				accBtn[i].addEventListener("click", function () {
					toggleClass(this, "active"); 
					toggleClass(this.parentNode.parentNode, "closed"); 
					toggleClass(this.parentNode.parentNode, "open"); 
					var panel = this.parentNode.nextElementSibling;
					if (panel.style.display === "block") {
						panel.style.display = "none";
					} else {
						panel.style.display = "block";
					}
				});
			}
		}catch (e){}
	}
	
	
	/*Instancia funciones*/
	if (window.addEventListener){
		window.addEventListener("load", tooltip, false);
		window.addEventListener("load", addAccordeon, false);
	}else{ 
		if (window.attachEvent){
			window.attachEvent("onload", tooltip);
			window.attachEvent("onload", addAccordeon);
		}else{ 
			window.onload = tooltip;
			window.onload = addAccordeon;
		}
	}

	
	
	