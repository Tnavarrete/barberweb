/* Licensed Materials Property of IBM 5724-O03
Copyright IBM Corp. 2013
US Government Users Restricted Rights - Use duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp
See Web Experience Factory license for terms and conditions of use*/
if(typeof wpf_dojo_utils85201404141110=="undefined"){
wpf_dojo_utils85201404141110={isDojoStylesLoaded:function(){
var _1=false;
try{
if(document.styleSheets){
for(var i=0;i<document.styleSheets.length;i++){
var _2=document.styleSheets[i];
var _3=_2.rules||_2.cssRules;
if(_3){
for(var j=0;j<_3.length;j++){
var _4=_3[j].cssText;
if(typeof _4=="undefined"){
_4=_3[j].selectorText;
}
if(_4&&_4.indexOf("dijit")>=0){
_1=true;
break;
}
}
}
}
}
}
catch(err){
}
if(_1){
wpf_dojo_utils85201404141110.isDojoStylesLoaded=function(){
return true;
};
}
return _1;
},updateFormInputs:function(id){
dojo.forEach(dojo.query("#"+id+" form"),function(_5){
dojo.forEach(dojo.query("*",_5),function(el){
var _6;
if(el.id&&(_6=dijit.byId(el.id))&&!_6.form){
_6.form=_5;
}
});
});
},toggleClass:function(_7,_8,_9){
var _a=_7.parentNode;
var _b=null;
while(_a!=null){
var _c=dojo.query("."+_8,_a);
if(_c.length>0){
_b=_c;
break;
}else{
_a=_a.parentNode;
}
}
if(_b!=null){
dojo.forEach(_b,function(_d){
dojo.toggleClass(_d,_9);
});
}
},loadIfNeeded:function(_e,_f,_10,_11){
window.wpfLoadedDojo=false;
if(typeof dojo=="undefined"){
djConfig={parseOnLoad:false,isDebug:false,locale:_f,isDebug:_11};
var url=_e;
if(_10){
if(opener!=null&&typeof opener.dojo!="undefined"&&typeof opener.dojo!="unknown"){
url=opener.dojo.baseUrl+"dojo.js";
}else{
if(parent!=null&&typeof parent.dojo!="undefined"&&typeof parent.dojo!="unknown"){
url=parent.dojo.baseUrl+"dojo.js";
}
}
}
document.write("<"+"script src='"+url+"'> </"+"script>");
window.wpfLoadedDojo=true;
}
},parseIfNeeded:function(_12,_13){
try{
if(!window.wpf_no_dojo_parse){
var e=dojo.byId(_13);
if(e&&(e.getAttributeNode("data-wef-dojo-parsed")==null)){
_12.parse(e);
dojo.query("[data-wef-dojo-wrapper]",e).attr("data-wef-dojo-parsed","true");
}
}
}
catch(ignore){
console.log("WEF.dojo_utils.parseIfNeeded("+_13+") -"+ignore);
}
}};
}
