/* Licensed Materials - Property of IBM - See Web Experience Factory product id 5724-O03 license for terms and conditions of use.
Copyright IBM Corp. 2006,2014
US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.*/
if(typeof wpf_io85201404141110=="undefined"){
var wpf_io85201404141110={bind:function(_1){
wpf_io85201404141110=typeof dojo!="undefined"?{bind:function(_2){
if(_2.formNode&&!_2.formNode.tagName){
_2.url=_2.url||_2.formNode.action;
_2.formNode=null;
}
var _3=(_2.formNode&&_2.formNode.method)||"GET";
var _4=_3.toLowerCase()=="post";
var _5=_2.url||_2.formNode.action;
var _6=_2.formNode?_2.formNode.enctype=="multipart/form-data":false;
var _7={isFileUpload:_6,url:_5,load:function(_8){
if(this.isFileUpload&&_8&&_8.documentElement){
_8=_8.documentElement.outerHTML||_8.documentElement.innerHTML;
}
_2.load(null,_8,null);
if(this.isFileUpload&&dojo.io.iframe["_frame"]){
dojo.destroy(dojo.io.iframe["_frame"]);
var _9=dojo.io.iframe._iframeName;
dojo.io.iframe["_frame"]=window[_9]=null;
if(window.frames){
window.frames[_9]=null;
}
}
},error:function(_a){
_2.error(null,_a);
},form:_2.formNode};
if(dojo.getObject("com.ibm.ajax.auth")){
com.ibm.ajax.auth.prepareSecure(_7);
}
try{
if(_6){
dojo.require("dojo.io.iframe");
_7.handleAs="html";
dojo.io.iframe.send(_7);
}else{
if(_4){
dojo.xhrPost(_7);
}else{
dojo.xhrGet(_7);
}
}
}
catch(transportError){
_7.error(transportError);
if(typeof console!="undefined"){
console.error("bind:",transportError);
}
}
}}:{xhpool:[],bind:function(_b){
var _c=(_b.formNode&&_b.formNode.method)||"GET";
var _d=_c.toLowerCase()=="post";
var _e=_b.url||_b.formNode.action;
var qs;
if(_b.formNode){
qs=this.serializeForm(_b.formNode);
if(qs&&!_d){
var _f="?";
if(_e.indexOf("?")>=0){
_f="&";
}
_e+=_f+qs;
}
}
var xh=this.getXMLHTTP();
xh.xmlhttp.onreadystatechange=function(){
if(xh.xmlhttp.readyState==4){
if(xh.xmlhttp.responseText){
var _10=xh.xmlhttp.responseText;
if(xh.xmlhttp.responseXML&&/application.xml/.test(xh.xmlhttp.getResponseHeader("Content-Type"))){
var _11=wpf_io85201404141110.findElement(xh.xmlhttp.responseXML,"feed");
if(_11){
var _12=wpf_io85201404141110.findElement(_11,"entry");
if(_12){
var c=wpf_io85201404141110.findElement(_12,"content");
if(c&&c.firstChild){
_10=c.firstChild.nodeValue;
}
}
}
}
_b.load(null,_10,null);
}
delete xh.xmlhttp["onreadystatechange"];
xh.active=false;
}
};
xh.xmlhttp.open(_d?"POST":"GET",_e,true);
xh.xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
xh.xmlhttp.send(_d?qs:null);
},findElement:function(el,p){
for(var i=0;i<el.childNodes.length;i++){
var n=el.childNodes[i];
if(n.nodeType!=1){
continue;
}
if(n.localName==p||n.baseName==p){
return n;
}
}
},PROGIDS:["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],getXMLHTTP:function(){
var xh=null,_13=null;
for(var x=0;x<this.xhpool.length;x++){
if(!this.xhpool[x].active){
xh=this.xhpool[x];
xh.active=true;
xh.xmlhttp.abort();
return xh;
}
}
var err=null;
try{
_13=new XMLHttpRequest();
if(_13){
return {xmlhttp:_13,active:true};
}
}
catch(e){
}
for(var i=0;!_13&&i<this.PROGIDS.length;++i){
var _14=this.PROGIDS[i];
try{
_13=new ActiveXObject(_14);
}
catch(e){
err=e;
}
}
if(_13){
this.PROGIDS=[_14];
}else{
throw (err);
}
return this.cacheXMLHTTP(_13);
},cacheXMLHTTP:function(_15){
var xh={active:true,xmlhttp:_15};
this.xhpool.push(xh);
return xh;
},serializeForm:function(_16){
if(!_16||!_16.elements||!_16.elements.length){
return "";
}
var q=[];
for(var i=0;i<_16.elements.length;i++){
var _17=this.serializeElement(_16.elements[i]);
if(_17&&_17.length>0){
q.push(_17.join("&"));
}
}
return q.join("&");
},serializeElement:function(el){
var _18=[];
if(!el.type){
return _18;
}
switch(el.type.toLowerCase()){
case "text":
case "textarea":
case "hidden":
case "password":
case "submit":
_18.push(encodeURIComponent(el.name)+"="+encodeURIComponent(el.value));
break;
case "checkbox":
case "radio":
if(el.checked){
_18.push(encodeURIComponent(el.name)+"="+encodeURIComponent(el.value));
}
break;
case "select-one":
case "select-multiple":
for(var i=0;i<el.options.length;i++){
if(el.options[i].selected){
_18.push(encodeURIComponent(el.name)+"="+encodeURIComponent(el.options[i].value));
}
}
break;
}
return _18;
}};
return wpf_io85201404141110.bind(_1);
}};
}
if(typeof wpf_ppr85201404141110=="undefined"){
var wpf_ppr85201404141110={submit:function(_19,_1a,_1b,_1c){
this.execute(_19.action,_19,_1a,_1b,_1c);
},load:function(url,_1d,_1e,_1f){
this.execute(url,null,_1d,_1e,_1f);
},execute:function(url,_20,_21,_22,_23){
if(!_22){
_22=wpf_ppr85201404141110.explicitHandler;
}
if(_22.prepare){
_22.prepare(url,_20,_21,_23);
}
this.prepareEvents(_23);
var _24=this;
var _25={url:url,load:function(_26,_27,evt){
_24.endLoad();
_24.doEvent(_23.preUpdateEventID,{ids:_21});
if(!_22.update(_27,_21,_23)){
wpf_ppr85201404141110.checkSessionTimeout(_27);
}
_24.doEvent(_23.postEventID,{ids:_21});
},error:function(_28,_29){
_24.endLoad();
_24.doEvent(_23.postEventID,{ids:_21});
_24.error(_28,_29);
_24.doEvent(_23.errorEventID,{ids:_21,type:_28,error:_29});
_24.checkSessionTimeout("<html></html>");
}};
if(_20){
_25.formNode=_20;
}
this.bind(_25);
_24.startLoad();
_24.doEvent(_23.preEventID,{ids:_21});
},prepareEvents:function(_2a){
if(_2a.eventPfx){
_2a.preEventID=_2a.eventPfx+"PreLoad";
_2a.preUpdateEventID=_2a.eventPfx+"PreUpdate";
_2a.postEventID=_2a.eventPfx+"PostLoad";
_2a.errorEventID=_2a.eventPfx+"LoadError";
}
},doEvent:function(id,_2b){
if(id&&typeof wpf_event_bus!="undefined"){
wpf_event_bus.fireLocally(id,_2b);
}
},error:function(_2c,_2d){
this.debugError(_2d);
},startLoad:function(){
},endLoad:function(){
},bind:function(_2e){
wpf_io85201404141110.bind(_2e);
},checkSessionTimeout:function(_2f){
var _30=function(_31){
return _31&&_31.indexOf("<")>=0;
};
var _32=function(){
if(typeof console=="object"&&console.error){
console.error("unexpected HTML reply - possible session timeout: doing full-page refresh");
}
top.location.reload();
};
if(typeof (wpf)=="object"&&wpf.overrides&&wpf.overrides.ajax){
if(typeof (wpf.overrides.ajax.isSessionTimeoutResponse)=="function"){
_30=wpf.overrides.ajax.isSessionTimeoutResponse;
}
if(typeof (wpf.overrides.ajax.handleSessionTimeout)=="function"){
_32=wpf.overrides.ajax.handleSessionTimeout;
}
}
if(_30(_2f)){
_32();
}
},debug:function(msg){
if(typeof console!="undefined"){
console.debug(msg);
}
},debugError:function(err){
if(typeof console!="undefined"){
console.debug(err);
}
},buildWidgets:function(_33){
if(typeof (dojo)!="undefined"&&dojo.parser&&typeof (dojo.parser.parse)=="function"){
for(var i=0;_33&&i<_33.length;i++){
var id=_33[i];
var dst;
if(typeof (id)=="string"){
dst=document.getElementById(id);
}else{
dst=id;
}
if(dst){
wpf_ppr85201404141110.removeControls(dst);
dojo.parser.parse(dst);
}
}
}
},removeControls:function(_34){
if(_34.nodeType==1){
var _35=_34.attributes;
if(_35.getNamedItem("dojoType")!=null){
var id=_35.getNamedItem("id");
if(id!=null&&id.value.length>0){
dijit.registry.remove(id.value);
}
}
var _36=_34.childNodes;
for(var i=0;i<_36.length;i++){
wpf_ppr85201404141110.removeControls(_36[i]);
}
}
},smartRefreshHandler:{prepare:function(url,_37,_38,_39){
var id=_38.length>0?_38[0]:null;
if(!id||id=="null"){
var dst=document.body;
id=dst.id||"_wpf_smart_refresh_body";
dst.id=id;
_38[0]=id;
}
if(typeof dojo!="undefined"){
wpf_ppr85201404141110.setTransitionClass(dojo.byId(id),"pre");
}
},update:function(_3a,_3b){
if(typeof (dijit)!="undefined"){
dijit._masterTT=null;
if(dijit.Tooltip){
dijit.Tooltip._masterTT=null;
}
}
wpf_ppr85201404141110.captureLoadEvents();
var id=_3b.length>0?_3b[0]:null;
var dst;
if(!id||id=="null"){
dst=document.body;
id=dst.id||"_wpf_smart_refresh_body";
dst.id=id;
_3b=[id];
}else{
dst=document.getElementById(id);
}
var _3c=[];
var _3d=document.write;
document.write=function(s){
_3c.push(s);
};
var ok;
try{
var _3e=typeof (dojo)!="undefined";
ok=wpf_ppr85201404141110.explicitHandler.update(_3a,_3b,{execScripts:!_3e,useDojo:_3e});
if(ok){
wpf_ppr85201404141110.executeHandlers();
if(typeof wpf_dojo_utils85201404141110!="undefined"){
wpf_dojo_utils85201404141110.updateFormInputs(id);
}
}
}
catch(ex){
ok=false;
if(typeof console!="undefined"){
console.error("update:",ex);
}
}
wpf_ppr85201404141110.releaseLoadEvents();
document.write=_3d;
if(ok&&_3c.length>0){
var _3f="_wpf_dwh_"+(new Date()).getTime();
var p=document.createElement("div");
var h=document.createElement("div");
h.id=_3f;
p.appendChild(h);
dst.appendChild(p);
var _40="<div id='"+_3f+"'>"+_3c.join(" ")+"</div>";
this.update(_40,[_3f]);
}
return ok;
}},scriptHandler:{update:function(_41,_42){
if(_41){
for(var i=0;i<wpf_ppr85201404141110.wrapperPatterns.length;i++){
var _43=wpf_ppr85201404141110.wrapperPatterns[i];
var _44=_41.match(_43);
if(_44!=null){
_41=_44[1];
break;
}
}
try{
eval(_41);
}
catch(problem){
if(typeof console!="undefined"){
console.error("scriptHandler::update",{exception:problem,script:_41});
}
return false;
}
}
return true;
}},directHandler:{update:function(_45,_46){
for(var i=0;_46&&i<_46.length;i++){
var id=_46[i];
var dst=document.getElementById(id);
if(dst){
dst.innerHTML=_45;
}
}
wpf_ppr85201404141110.buildWidgets(_46);
return true;
}},explicitHandler:{update:function(_47,_48,_49){
var ok=false;
var _4a=/MSIE/.test(navigator.userAgent);
var tmp=null;
if(_4a){
tmp=document.getElementById("_wpf_ppr85201404141110_temp_span");
}
if(!tmp){
tmp=document.createElement("span");
tmp.id="_wpf_ppr85201404141110_temp_span";
tmp.style.display="none";
if(_4a){
document.body.appendChild(tmp);
}
}
if(_4a){
_47=_47.replace(/(<link|<script)/ig,"<input type='hidden' name='.wpiefix' />$1");
}
if(_48&&_48[0]==document.body.id){
ok=wpf_ppr85201404141110.explicitHandler.injectContent(document.body,_47,_49&&_49.useDojo);
}else{
tmp.innerHTML=_47;
var _4b=tmp.childNodes.length;
for(var n=0;n<_4b;n++){
var _4c=tmp.childNodes[n];
wpf_ppr85201404141110.updateCSS(_4c,_48);
ok=wpf_ppr85201404141110.explicitHandler.updateContent(_4c,_48,_49&&_49.useDojo)||ok;
}
}
if(_49&&_49.execScripts){
wpf_ppr85201404141110.executeScripts(document,_48);
}
if(!_49||!_49.useDojo){
wpf_ppr85201404141110.buildWidgets(_48);
}
tmp.innerHTML="";
return ok;
},updateContent:function(_4d,_4e,_4f){
var ok=false;
var id=_4d.getAttribute?_4d.getAttribute("id"):null;
if(id){
var _50=false;
if(!_4e||_4e.length==0){
var dst=document.getElementById(id);
if(dst){
dst.innerHTML=_4d.innerHTML;
return true;
}
}else{
for(var i=0;i<_4e.length;i++){
if(id==_4e[i]){
var ok=true;
var dst=document.getElementById(id);
if(dst){
ok=this.injectContent(dst,_4d.innerHTML,_4f);
}
return ok;
}
}
}
}
for(var c=_4d.firstChild;c!=null;c=c.nextSibling){
ok=wpf_ppr85201404141110.explicitHandler.updateContent(c,_4e,_4f)||ok;
}
return ok;
},injectContent:function(dst,_51,_52){
dst.setAttribute("aria-live","polite");
var ok=true;
if(!_52){
dst.innerHTML=_51;
return true;
}
var _53=dijit.byId(dst.id);
window.wpf_no_dojo_parse=true;
try{
if(!_53){
dojo.style(dst,"display",dojo.style(dst,"display"));
_53=new wpf.widget.RefreshContainer({content:_51,executeScripts:true,renderStyles:true},dst.id);
_53.startup();
try{
if(!(_53.wasResizeCalled)||!_53.wasResizeCalled()){
_53.resize();
}
}
catch(ig){
}
}else{
_53.attr("content",_51);
}
try{
dojo.query("[data-wef-dojo-wrapper]",dst).attr("data-wef-dojo-parsed","true");
}
catch(ig2){
}
if(typeof (dijit)!="undefined"&&dijit._underlay!=null&&dijit._underlay._destroyed){
dijit._underlay=null;
}
if(typeof dojo!="undefined"){
wpf_ppr85201404141110.setTransitionClass(dst,"post");
}
}
catch(ex){
if(typeof console!="undefined"){
console.error("injectContent:",ex);
}
ok=false;
}
try{
if(typeof SemTagSvc!="undefined"){
SemTagSvc.parseDom(null,dst);
}
}
catch(ignored){
}
window.wpf_no_dojo_parse=false;
return ok;
}},debugHandler:{update:function(_54,_55){
debug(_54);
}},updateCSS:function(el,_56){
try{
if(_56){
for(var i=0;i<_56.length;i++){
var _57;
if(el.id==_56[i]){
_57=el;
}else{
if(el.getElementById){
_57=el.getElementById(_56[i]);
}
}
wpf_ppr85201404141110.updateCSS(_57);
}
return;
}
if(!el){
return;
}
var _58=el.getElementsByTagName("link");
if(!_58){
return;
}
for(var i=0;i<_58.length;i++){
var css=_58[i];
if(css.rel=="stylesheet"){
wpf_ppr85201404141110.addCSSReference(css.href);
}
}
}
catch(err){
console.log(err);
}
},executeScripts:function(el,_59){
if(_59){
for(var i=0;i<_59.length;i++){
var _5a;
if(el.id==_59[i]){
_5a=el;
}else{
if(el.getElementById){
_5a=el.getElementById(_59[i]);
}
}
wpf_ppr85201404141110.executeScripts(_5a);
}
return;
}
if(!el){
return;
}
var _5b=el.getElementsByTagName("script");
if(!_5b){
return;
}
var _5c={deferredItems:[],conditions:[],ready:false,addDeferred:function(_5d){
this.deferredItems.push(_5d);
},addCondition:function(_5e){
this.conditions.push(_5e);
},notify:function(_5f){
if(!_5f){
ready=true;
}
if(!_5f||!_5f.readyState||_5f.readyState==="loaded"||_5f.readyState==="complete"){
var idx=-1;
for(var i=0;i<this.conditions.length;i++){
if(this.conditions[i]==_5f){
idx=i;
}
}
if(idx!=-1){
this.conditions.splice(idx,1);
}
if(ready&&(this.conditions.length==0)){
for(var i=0;i<this.deferredItems.length;i++){
wpf_ppr85201404141110.evaluateScriptText(this.deferredItems[i].innerHTML);
}
}
}
}};
for(var i=0;i<_5b.length;i++){
var _60=_5b[i];
var src=_60.src;
if(src){
wpf_ppr85201404141110.addScriptReference({src:src,deferred:_5c});
}else{
_5c.addDeferred(_60);
}
}
_5c.notify();
},evaluateScriptText:function(_61){
if(typeof window._wpf_ppr85201404141110_global_eval=="undefined"){
window.eval("var _wpf_ppr85201404141110_global_eval  = function(s) { window.eval(s); }");
}
if(typeof window._wpf_ppr85201404141110_global_eval=="undefined"){
window._wpf_ppr85201404141110_global_eval=function(s){
wpf_ppr85201404141110.addScriptReference({text:s});
};
}
window._wpf_ppr85201404141110_global_eval(_61);
},addScriptReference:function(_62){
var el=document.createElement("script");
el.type="text/javascript";
el.defer=false;
if(_62.deferred){
var _63=_62.deferred;
_63.addCondition(el);
el.onload=el.onreadystatechange=function(){
_63.notify(this);
};
}
if(_62.text){
el.text=_62.text;
}
if(_62.src){
el.src=_62.src;
}
var _64=document.getElementsByTagName("head");
if(_64.length){
_64.item(0).appendChild(el);
}else{
var _65=document.createElement("head");
_65=document.documentElement.appendChild(_65);
_65.appendChild(el);
}
},addCSSReference:function(_66){
var _67=false;
var _68=document.getElementsByTagName("head");
if(_68.length){
var _69=_68.item(0).getElementsByTagName("link");
for(var i=0;i<_69.length;i++){
if(_69[i].rel=="stylesheet"){
if(_69[i].href==_66){
_67=true;
}
}
}
}
if(!_67){
var el=document.createElement("link");
el.rel="stylesheet";
el.type="text/css";
el.href=_66;
if(_68.length){
_68.item(0).appendChild(el);
}else{
var _6a=document.createElement("head");
_6a=document.documentElement.appendChild(_6a);
_6a.appendChild(el);
}
}
},captureLoadEvents:function(){
this.handlerList=[];
var me=this;
if(window.addEventListener){
this.window_addEventListener=window.addEventListener;
window.addEventListener=function(a,b,c){
me.addEventListener(a,b,c);
};
}else{
window.window_attachEvent=window.attachEvent;
window.attachEvent=function(a,b){
me.attachEvent(a,b);
};
}
},releaseLoadEvents:function(){
if(this.window_addEventListener){
window.addEventListener=this.window_addEventListener;
}else{
window.attachEvent=window.window_attachEvent;
}
this.handlerList=[];
},addEventListener:function(_6b,_6c,_6d){
if(_6b=="load"){
this.registerHandler(_6c);
}else{
this.window_addEventListener.apply(window,[_6b,_6c,_6d]);
}
},attachEvent:function(_6e,_6f){
if(_6e=="onload"){
this.registerHandler(_6f);
}else{
window.window_attachEvent(_6e,_6f);
}
},registerHandler:function(_70){
var _71=function(){
if(document.createEvent){
var _72=document.createEvent("Events");
_72.initEvent("load",true,true);
_70.apply(window,[_72]);
}else{
var _73=function(){
return _70();
};
document.body.attachEvent("onload",_73);
document.body.fireEvent("onload");
document.body.detachEvent("onload",_73);
}
};
this.handlerList.push({executor:_71,context:window});
},executeHandlers:function(){
for(var i=0;i<this.handlerList.length;i++){
var obj=this.handlerList[i];
try{
var _74=obj.executor;
var _75=obj.context;
_74.call(_75);
}
catch(error){
if(typeof console!="undefined"){
console.error("executeHandlers:",error);
}
}
delete this.handlerList[i];
}
},setTransitionClass:function(el,_76){
var _77="wpf-"+_76+"-load-transition",_78="wpf-"+_76+"-load-transition-init",_79="data-"+_77+"-class",_7a="data-"+_78+"-class";
var _7b=el.getAttribute(_79)||dojo.body().getAttribute(_79)||_77;
var _7c=el.getAttribute(_7a)||dojo.body().getAttribute(_7a)||_78;
dojo.removeClass(el,_7b);
if(_7c){
dojo.addClass(el,_7c);
}
window.setTimeout(function(){
dojo.addClass(el,_7b);
},10);
},wrapperPatterns:[/^\/\*(.*)\s*\*\/\s*$/m,/^\/\*-secure-\s*(.*)\s*\*\/\s*$/m,/^\s*while\s*\(\s*1\s*\)\s*;(.*)$/m,/^([\s\S]*\S[\s\S]*)<script[\s\S]*script>[\s\n]*$/mi,/^[\s\n]*<script[\s\S]*script>([\s\S]+)$/mi]};
}
