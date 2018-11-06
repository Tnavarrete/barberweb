/**
 * 
 */
function dojoValidateForm(nameForm){
	var form = dijit.byId(nameForm);
	if(!form.validate()){
		return false;
	}
	return true;
}
