/* Licensed Materials, Property of IBM (see product id 5724-O03 for license terms and conditions)
 * Copyright IBM Corp. 2006,2013
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 * WEF CORE PRODUCT SUPPORT, NOT CUSTOMER MODIFIABLE, OVERWRITTEN ON UPGRADE
 */
if (typeof wpf_event_bus=="undefined"){
 var wpf_event_bus={
  listeners:[],
  fire:function(id,args){
   var windows=[];
   wpf_event_bus.getAllWindows(window.top,windows);
   for (var iw=0;iw<windows.length;iw++){
    var bus=windows[iw].wpf_event_bus;
    if (bus){
     if (!windows[iw].name || !/^wpf_ar_/.test(windows[iw].name))
      bus.fireLocally(id,args);
    }
   }
  },
  fireLocally:function(id,args){
   var ls=(this.listeners[id]||[]).concat(this.listeners["*"]||[]);
   for (var i=0;i<ls.length;i++){
    ls[i].handle.apply(args,[id]);
   }
  },
  addListener:function(id,l){
   if(/^wpf_ar_/.test(window.name))
    return;
   if(!this.listeners[id]) this.listeners[id]=[];
   if(l._handlerID){
    var lst=this.listeners[id];
    for(var i=0;i<lst.length;i++){
     if(l._handlerID==lst[i]._handlerID){
      lst[i]=l;
      return;
     }
    }
   }
   this.listeners[id].push(l);
  },
  getAllWindows:function(w,windows){
   windows.push(w);
   for(var i=0;i<w.frames.length;i++){
    wpf_event_bus.getAllWindows(w.frames[i],windows);
   }
  }
 };
}
/* Unversioned, 1st one wins */
window["wpf"+"_event_bus"]=window["wpf"+"_event_bus"]||wpf_event_bus;
