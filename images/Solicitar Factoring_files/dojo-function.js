dojo.provide("ValidationTextarea");
dojo.require("dijit.form.SimpleTextarea");
dojo.require("dijit.form.ValidationTextBox");

/**
 * autor: IBM TEAM
 * fecha: 26-10-2015
 * descripción: componente que mantiene un conjunto de funciones utilitarias para el sitio, (validaciones, mensajes, filtros)
 * 
*/



dojo.declare(
    "ValidationTextarea",
    [dijit.form.ValidationTextBox,dijit.form.SimpleTextarea],
    {
        invalidMessage: "This field is required", regExp: "(.|\\s)*", 

        postCreate: function() {
        	
            this.inherited(arguments);
        },

        validate: function() {
        	
        	if (arguments.length==0) {
        		
        	return this.validate(false);
        	}
        	// alert(this.get('displayedValue'));
        	
        	return this.inherited(arguments);
        	},

        	
        onFocus: function() {
            if (!this.isValid()) {
            	this.displayMessage(this.getErrorMessage());
            }
        },

        onBlur: function() {
        		this.validate(false);
        	
        }
     }
);



var timeout = 0;
var milisegundos = 500;
function hasPlaceholderSupport() {
	var input = document.createElement('input');
	return ('placeholder' in input);
}

if (!hasPlaceholderSupport()) {
	var inputs = document.getElementsByTagName('input');
	for ( var i = 0, count = inputs.length; i < count; i++) {
		if (inputs[i].getAttribute('placeholder')) {
			inputs[i].style.cssText = "color:#939393;font-style:italic;"
			inputs[i].value = inputs[i].getAttribute("placeholder");
			inputs[i].onclick = function() {
				if (this.value == this.getAttribute("placeholder")) {
					this.value = '';
					this.style.cssText = "color:#000;font-style:normal;"
				}
			}
			inputs[i].onblur = function() {
				if (this.value == '') {
					this.value = this.getAttribute("placeholder");
					this.style.cssText = "color:#939393;font-style:italic;"
				}
			}
		}
	}
}

/*
 * Fix for sort column letters in alt and title tag.
 */
window.onload = function (){
	sortColumnFix();
};
/* ends */



function sortColumnFix(){
	var imgs = document.getElementsByTagName("img");
	for(var x=0;x<imgs.length;x++){
		 if("Sort column" == imgs[x].alt){
			 imgs[x].alt ="Ordenar columna";
			 imgs[x].title="Ordenar columna";
		 }
	}
}


/*
 * CALENDARIO FILTRO window.onload = function(){
 * monthYearCalendar.init("boxMonthYear",show); }
 */
function show() {
    document.getElementById("result").innerHTML  =   (monthYearCalendar.selectedMonth.length=="1")? "0" + monthYearCalendar.selectedMonth+ " / " + monthYearCalendar.selectedYear:monthYearCalendar.selectedMonth + " / " + monthYearCalendar.selectedYear;
}
/* FIN CALENDARIO FILTRO */

/* UTILIDAD PARA SALTAR A OTRO ElEMENTO TEXTBOX */
function saltarTextBox(elemOrigen, cantCaracteres, elemTextBoxId){
	var msg = elemOrigen.get('value'); 
	if(msg != ""){
		var formatedAmount = new RegExp("[0-9]{2}", "g");
		if ( formatedAmount.test(msg) ) {
			document.getElementById(elemTextBoxId).focus();
		}
	}
}
/* FIN DE UTILIDAD PARA SALTAR A OTRO ElEMENTO TEXTBOX */




/**
 * Descripcion: Funcion es utilizada para retrasar la ejecucion de una accion un
 * cierto tiempo.
 * 
 * Parametros: function - object Retorno: Ejecuta la llamada a funcion de
 * entrada.
 */

function buscarEnTabla(event){
	if (isCharacterKeyPress(event)){
		RetrasarEjecucion(function(){filtrarTabla();});
	}
}
function RetrasarEjecucion( object ) {
    if (timeout){	
        window.clearTimeout(timeout);
	}
	timeout = window.setTimeout(object,  milisegundos);	
}
function RetrasarEjecucionDivisas( object ) {
    if (timeout){	
        window.clearTimeout(timeout);
	}
	timeout = window.setTimeout(object,  5000);	
}
function filtrarTabla() {
		var buscarValue = document.getElementById("buscar").value;
		document.getElementById("buscar").value = convertSearchStatement(buscarValue, true, true);
		document.getElementById('btnBuscar').onclick();
		document.getElementById("buscar").value = buscarValue;
}
function isCharacterKeyPress(evt) {
	var keycode = evt.keyCode;

    var valid = 
        (keycode > 47 && keycode < 58)   || // number keys
        keycode == 32 || // spacebar & return key(s) (if you
        keycode == 8 || keycode == 46	 ||	// want to allow carriage returns)
        (keycode > 64 && keycode < 91)   || // letter keys
        (keycode > 95 && keycode < 112)  || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223);   // [\]' (in order)

    return valid;
}


/**
 * Descripcion: Funcion es utilizada para retrasar la ejecucion de una accion un
 * cierto tiempo.
 * 
 * Parametros: function - object Retorno: Ejecuta la llamada a funcion de
 * entrada.
 */
function RetrasarEjecucionHistorica( object ) {
	//alert("ingreso nueva");
    if (timeout){	
        window.clearTimeout(timeout);
	}
	timeout = window.setTimeout(object,  milisegundos);	
}
function filtrarTablaHistorica() {
	//alert("ingreso filtro");
	var buscarValue = document.getElementById("buscarHistorica").value;
	document.getElementById("buscarHistorica").value = convertSearchStatement(buscarValue, true, true);
	document.getElementById('btnBuscarHistorica').onclick();
	document.getElementById("buscarHistorica").value = buscarValue;
}


function getFecha () {
	var now = new Date();
	var year = "" + now.getFullYear();
	var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
	var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
	var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
	var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
	var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }	 	  
	var fecha = day + "/" + month + "/" + year;
	document.getElementById("fecha").innerHTML=fecha;
	 // return year + "-" + month + "-" + day + " " + hour + ":" + minute +
		// ":" + second;
}


/**
 * 
 * @param idElementMonto
 * @param idElementMsg
 * @param validationMessage
 * @returns {Boolean}
 */
function validarMonto(saldo, idElementMonto, idElementMsg, validation1_message, validation2_message){	
	document.getElementById(idElementMsg).innerHTML = "";
	document.getElementById(idElementMsg).style.display = "none";
	var elemMonto = document.getElementById(idElementMonto);
	if(elemMonto != null){
		saldo = saldo || 0;
		saldo = parseFloat(saldo);
		var monto = +removeFormatMoney(elemMonto.value || elemMonto.innerHTML);
		monto = monto || 0;
		if(monto <= 0){
			document.getElementById(idElementMsg).innerHTML = validation1_message;
			document.getElementById(idElementMsg).style.display = "block";
			dojo.query(".error-validacion").addClass("mensaje_visible");
			return false;
		}else if(monto > saldo){
			document.getElementById(idElementMsg).innerHTML = validation2_message;
			document.getElementById(idElementMsg).style.display = "block";
			dojo.query(".error-validacion").addClass("mensaje_visible");
			return false;
		}else{
			dojo.query(".error-validacion").removeClass("mensaje_visible");
			return true;
		}
	}else{
		return false;
	}	
}
function validarMontoYFacultadMaximo(saldo,maximo, idElementMonto, idElementMsg, validation1_message, validation2_message,validation3_message){	
	document.getElementById(idElementMsg).innerHTML = "";
	document.getElementById(idElementMsg).style.display = "none";
	var elemMonto = document.getElementById(idElementMonto);
	if(elemMonto != null){
		saldo = saldo || 0;
		saldo = parseFloat(saldo);
		var monto = +removeFormatMoney(elemMonto.value || elemMonto.innerHTML);
		monto = monto || 0;
		if(monto <= 0){
			document.getElementById(idElementMsg).innerHTML = validation1_message;
			document.getElementById(idElementMsg).style.display = "block";
			dojo.query(".error-validacion").addClass("mensaje_visible");
			return false;
		}else if(monto > saldo){
			document.getElementById(idElementMsg).innerHTML = validation2_message;
			document.getElementById(idElementMsg).style.display = "block";
			dojo.query(".error-validacion").addClass("mensaje_visible");
			return false;
		}else if(maximo!=-1 && monto > maximo){
			document.getElementById(idElementMsg).innerHTML = validation3_message;
			document.getElementById(idElementMsg).style.display = "block";
			dojo.query(".error-validacion").addClass("mensaje_visible");
			return false;
		}else{
			dojo.query(".error-validacion").removeClass("mensaje_visible");
			return true;
		}
	}else{
		return false;
	}	
}
function validarMontoDiv(saldo, idElementMonto, idElementMsg, validation1_message, validation2_message){	
	dojo.query(".error-validacion").removeClass("mensaje_visible");
	document.getElementById(idElementMsg).innerHTML = "";
	document.getElementById(idElementMsg).style.display = "none";
	var elemMonto = document.getElementById(idElementMonto);
	if(elemMonto != null){
		saldo = saldo || 0;
		saldo = parseFloat(saldo);
		var monto = +removeFormatMoney(elemMonto.value || elemMonto.innerHTML);
		monto = monto || 0;
		if(monto <= 0){
			document.getElementById(idElementMsg).innerHTML = validation1_message;
			document.getElementById(idElementMsg).style.display = "block";
			dojo.query(".error-validacion").addClass("mensaje_visible");
			return false;
		}else if(monto > saldo){
			document.getElementById(idElementMsg).innerHTML = validation2_message;
			document.getElementById(idElementMsg).style.display = "block";
			dojo.query(".error-validacion").addClass("mensaje_visible");
			return false;
		}else{
			dojo.query(".error-validacion").removeClass("mensaje_visible");
			return true;
		}
	}else{
		return false;
	}	
}
/**
 * 
 * @param idElementMonto
 * @param idElementMsg
 * @param validationMessage
 * @returns {Boolean}
 */
function validarMontoDolar(saldo, idElementMonto, idElementMsg, validation1_message, validation2_message){	
	document.getElementById(idElementMsg).innerHTML = "";
	document.getElementById(idElementMsg).style.display = "none";
	var elemMonto = document.getElementById(idElementMonto);
	if(elemMonto != null){
		saldo = saldo || 0;
		saldo = parseFloat(saldo);
		var monto = +removeFormatMoneyDolar(elemMonto.value || elemMonto.innerHTML);
		monto = monto || 0;
		if(monto <= 0){
			document.getElementById(idElementMsg).innerHTML = validation1_message;
			document.getElementById(idElementMsg).style.display = "block";
			dojo.query(".error-validacion").addClass("mensaje_visible");
			return false;
		}else if(monto > saldo){
			document.getElementById(idElementMsg).innerHTML = validation2_message;
			document.getElementById(idElementMsg).style.display = "block";
			dojo.query(".error-validacion").addClass("mensaje_visible");
			return false;
		}else{
			dojo.query(".error-validacion").removeClass("mensaje_visible");
			return true;
		}
	}else{
		return false;
	}	
}

/**
 * 
 * @param idElementMonto
 * @param idElementMsg
 * @param validationMessage
 * @returns {Boolean}
 */
function montoMinPesos(saldoMin, idElementMonto, idElementMsg, validation1_message){	
	document.getElementById(idElementMsg).innerHTML = "";
	document.getElementById(idElementMsg).style.display = "none";
	var elemMonto = document.getElementById(idElementMonto);
	if(elemMonto != null){
		saldoMin = saldoMin || 0;
		saldoMin = parseFloat(saldoMin);
		var monto = +removeFormatMoney(elemMonto.value || elemMonto.innerHTML);
		monto = monto || 0;
		if(monto >= saldoMin){
			return true;
		}else{
			document.getElementById(idElementMsg).innerHTML = validation1_message;
			document.getElementById(idElementMsg).style.display = "block";
			return false;
			
		}
	}else{
		return false;
	}	
}

/**
 * 
 * @param idElementMonto
 * @param idElementMsg
 * @param validationMessage
 * @returns {Boolean}
 */
function montoMinDolar(saldoMin, idElementMonto, idElementMsg, validation1_message){	
	document.getElementById(idElementMsg).innerHTML = "";
	document.getElementById(idElementMsg).style.display = "none";
	var elemMonto = document.getElementById(idElementMonto);
	if(elemMonto != null){
		saldoMin = saldoMin || 0;
		saldoMin = parseFloat(saldoMin);
		var monto = +removeFormatMoneyDolar(elemMonto.value || elemMonto.innerHTML);
		monto = monto || 0;
		if(monto >= saldoMin){
			return true;
		}else{
			document.getElementById(idElementMsg).innerHTML = validation1_message;
			document.getElementById(idElementMsg).style.display = "block";
			return false;
		}
	}else{
		return false;
	}	
}
/**
 * Validatio Dojo form.validate()
 * 
 * @param nameForm
 * @returns {Boolean}
 */
function dojoValidateForm(nameForm){
	var form = dijit.byId(nameForm);
	if(!form.validate()){
		return false;
	}
	return true;
}
/**
 * Replaza un string javascript en todas las ocurrencias.
 * 
 * @param source
 * @param stringToFind
 * @param stringToReplace
 * @returns
 */
function ReplaceAll(source,stringToFind,stringToReplace){
  var temp = source;
    var index = temp.indexOf(stringToFind);
        while(index != -1){
            temp = temp.replace(stringToFind,stringToReplace);
            index = temp.indexOf(stringToFind);
        }
        return temp;
}


function convertSearchStatement(userStatement, includeDates, includeCurrency) {
	var newStatement = userStatement;
	if ( includeDates ) {
		if ( userStatement == "/" )
			return "-";
		var monthOnly =  new RegExp("^\/([1-9]|0[1-9]|1[0-2])$", "g");
		var dayOrMonthOnly =  new RegExp("^([0][1-9]|[1][0-9]|[2][0-9]|3[01])\/{0,1}$", "g");
		var dayAndMonth =  new RegExp("^([0][1-9]|[1][0-9]|[2][0-9]|3[01])\/([1-9]|0[1-9]|1[0-2])[\/]{0,1}$", "g");
		var monthYear = new RegExp("^([1-9]|0[1-9]|1[0-2])\/(20[0-9]{2})$", "g");
		var dayMonthYear = new RegExp("^([0][1-9]|[1][0-9]|[2][0-9]|3[01])\/([1-9]|0[1-9]|1[0-2])\/(20[0-9]{2})$", "g");
		if ( dayMonthYear.test(userStatement) ) {
			var firstSlash = userStatement.indexOf("/");
			var lastSlash = userStatement.lastIndexOf("/");
			var year = userStatement.substring(lastSlash + 1, userStatement.length);
			var month = userStatement.substring(firstSlash + 1, lastSlash);
			var day = userStatement.substring(0, firstSlash);
			if ( month.length == 1 )
				month = "0" + month;
			if ( day.length == 1 )
				day = "0" + day;
			return year + "-" + month + "-" + day;
		}
		else if ( dayAndMonth.test(userStatement) ) {
			var slashPos = userStatement.indexOf("/");
			var month = userStatement.substring(slashPos + 1, userStatement.length).replace("/", "");
			var day = userStatement.substring(0, slashPos);
			if ( month.length == 1 )
				month = "0" + month;
			if ( day.length == 1 )
				day = "0" + day;
			return month + "-" + day;
		}
		else if ( monthYear.test(userStatement) ) {
			var slashPos = userStatement.indexOf("/");
			var year = userStatement.substring(slashPos + 1, userStatement.length).replace("/", "");
			var month = userStatement.substring(0, slashPos);
			if ( month.length == 1 )
				month = "0" + month;
			return year + "-" + month;			
		}
		else if ( dayOrMonthOnly.test(userStatement) ) {
			var dayOrMonth = userStatement.replace("/", "");
			if ( dayOrMonth.length == 1)
				return "-0" + dayOrMonth;
			else
				return "-" + dayOrMonth;
		}
		else if ( monthOnly.test(userStatement) ) {
			var monthOnly = userStatement.replace("/", "");
			if ( monthOnly.length == 1)
				return "0" + monthOnly + "-";
			else
				return monthOnly + "-";
		}
	}
	if ( includeCurrency ) {
		var formatedAmount = new RegExp("^.*-?[0-9]{1,3}(\.[0-9]{3})+(,[0-9]*)?$", "g");
		if ( formatedAmount.test(userStatement) ) {
			newStatement = userStatement.replace(/[^0-9\,\-]+/g,'').replace(",", ".").trim();
		}
		var unformatedAmount = new RegExp("^-?[0-9]*(,[0-9]*)$", "g");
		if ( unformatedAmount.test(newStatement) )
			return newStatement.replace(",", ".");
	}
	return newStatement;
}


/**
 * Metodo para saber si un radio esta seleccionado
 * 
 * @param radioGroupName
 * @returns {Boolean}
 */
function isSelectedRadio(radioGroupName) {
	var radioGroup = document.getElementsByName(radioGroupName);
	var radioElement = radioGroup.length;
	for(var index = 0; index < radioElement; index++) {
	    if(radioGroup[index].checked == true){
	        return true;
	    }
	}
	return false;	
}


/**
 * Metodo para sacar de un array elementos duplicados
 * 
 * @param ar
 * @returns
 */
function a_unico(ar){ 
    // Codigo creado por EspacioWebmasters.com
    // puedes copiarlo citando la fuente
    // Declaramos las variables
    var ya=false,v="",aux=[].concat(ar),r=Array(); 
    // Buscamos en el mismo Array si
    // cada elemento tiene uno repetido
    for (var i in aux){ // 
        v=aux[i]; 
        ya=false; 
        for (var a in aux){ 
            // Preguntamos si es el primer elemento
            // o si ya se recorrio otro igual
            // Si es el primero se asigna true a la variable "ya"
            // Si no es el primero, se le da valor vacio
            if (v==aux[a]){ 
                if (ya==false){ 
                    ya=true; 
                } 
                else{ 
                    aux[a]=""; 
                } 
            } 
        } 
    } 
    // Aqui ya tenemos los valores duplicados
    // convertidos en valores vacios
    // Solo falta crear otro Array con los valores
    // que quedaron sin contar los vacios
    for (var a in aux){ 
        if (aux[a]!=""){ 
            r.push(aux[a]); 
        } 
    } 
    // Retornamos el Array creado
    return r; 
} 


/**
 * Metodo utilizado para crear un elemento DIV dinámico que bloquea el front
 * mientras se realiza alguna transacción. El mensaje muestra el texto "Espere
 * un momento..." acompañado del loading. Se el parámetro "correo" se utiliza
 * para mostrar el email del destinatario, cuando se presiona el icono asociado
 * en la barra inferior de las tablas.
 */
function createBlockDiv(mostrarMensaje){
	// FECHA ACTUALIZACION: 13 AGOSTO 2014
	var block = dojo.byId("block-page");
	dojo.addClass (block, 'wrap-bg');
	if(mostrarMensaje == 'si'){
		// dojo.attr(block, 'innerHTML', '<div class="wind-emerg
		// loading-emerg"><i class="ico load"></i><div
		// class="info-emerg"><p>Espere un momento...</p></div></div>');
		dojo.attr(block, 'innerHTML', '<div class="wind-emerg loading-emerg"><img src="/wps/PA_bic_wef_empresa/app/images/ajax-loader.gif"></img><div class="info-emerg"><p>Espere un momento...</p></div></div>');
	}else {
		dojo.attr(block, 'innerHTML', '<div></div>');
	}
	
	return false;
}



/**
 * Metodo utilizado para crear un elemento DIV dinámico que bloquea el front
 * mientras se realiza alguna transacción. El mensaje muestra el texto "Espere
 * un momento..." acompañado del loading. Se el parámetro "correo" se utiliza
 * para mostrar el email del destinatario, cuando se presiona el icono asociado
 * en la barra inferior de las tablas.
 */
function desactivarBlockDiv(){
	// FECHA ACTUALIZACION: 13 AGOSTO 2014
	var block = dojo.byId("block-page");
	dojo.removeAttr('innerHTML');
}

function validatePressedKey(event){
	if (event.keyCode==13 ||event.keyCode==32)return false;
}
function validarMontoSinCero(saldo, idElementMonto, idElementMsg, validation1_message, validation2_message){	
	
	document.getElementById(idElementMsg).innerHTML = "";
	document.getElementById(idElementMsg).style.display = "none";
	var elemMonto = document.getElementById(idElementMonto);
	if(elemMonto != null){
		saldo = saldo || 0;
		saldo = parseFloat(saldo);
		var monto = +removeFormatMoney(elemMonto.value || elemMonto.innerHTML);
		monto = monto || 0;
		if(monto > saldo){
			document.getElementById(idElementMsg).innerHTML = validation2_message;
			document.getElementById(idElementMsg).style.display = "block";
			dojo.query(".error-validacion").addClass("mensaje_visible");
			return false;
		}else{
			dojo.query(".error-validacion").removeClass("mensaje_visible");
			return true;
		}
	}else{
		return false;
	}	
}