/* Licensed Materials Property of IBM 5724-O03
Copyright IBM Corp. 2013
US Government Users Restricted Rights - Use duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp
See Web Experience Factory license for terms and conditions of use*/
if(typeof wpf_dojo_progress_indicator=="undefined"){
wpf_dojo_progress_indicator={isShowing:false,show:function(_1){
if(this.isShowing){
return;
}
if(_1.useDialog){
if(!this.dlg){
this.dlg=new dijit.Dialog({});
}
if(!this.isShowing){
var el=dojo.byId(_1.source);
this.dlg.attr("content",el.innerHTML);
this.dlg.show();
}
}else{
var _2=dojo.byId(_1.source);
var _3="";
if(_2&&_2.innerHTML){
_3=_2.innerHTML.replace(/wef.hide.script/gmi,"script");
}
for(var i=0;i<_1.ids.length;i++){
var _4=dojo.byId(_1.ids[i]);
if(_4){
if(_4.style.display=="none"){
_4.style.display="";
}
if(_2){
var _5=_3;
if(_1.insertInsideBottom){
var br=document.createElement("br");
_4.appendChild(br);
var _6=document.createElement("div");
_4.appendChild(_6);
_4=_6;
_6.style.clear="both";
}else{
if(_1.insertInsideTop){
var _6=document.createElement("div");
_4.insertBefore(_6,_4.firstChild);
_4=_6;
dojo.style(_6,{clear:"both"});
}else{
if(_1.overRegion){
var _6=document.createElement("div");
_4.appendChild(_6);
_4=_6;
dojo.style(_6,{clear:"both"});
}
}
}
var _7=(_1.ppr&&typeof _1.ppr==="string")?dojo.getObject(_1.ppr):_1.ppr;
if(_7&&!_1.insertInsideBottom&&!_1.insertInsideTop&&!_1.overRegion){
_7.explicitHandler.injectContent(_4,_3,true);
}else{
try{
_4.innerHTML=_3;
}
catch(e){
if(_7){
_7.explicitHandler.injectContent(_4,_3,true);
}else{
throw e;
}
}
}
if(_1.overRegion){
_6.setAttribute("class","wpf_progress_indicator_box");
var w=_6.clientWidth;
dojo.style(_4,{position:"absolute",left:"50%",top:"50%",margin:-w/100+"px",border:"1px solid black",padding:"4px",zIndex:"9999"});
if(dojo.isIE){
dojo.style(_4,{backgroundColor:"white"});
}
}
}
}
}
}
this.isShowing=true;
},hide:function(_8){
this.isShowing=false;
if(_8.useDialog){
if(this.dlg){
this.dlg.hide();
this.dlg=null;
}
}else{
if(_8.hide||_8.overRegion){
for(var i=0;i<_8.ids.length;i++){
var _9=dojo.byId(_8.ids[i]);
if(_9){
if(_8.hide){
_9.style.display="none";
}
}
}
}
}
}};
}

