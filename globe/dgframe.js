
// test if a parameter value is dglux table
function dgIsParamTable(val){
  return (val != null && typeof(val)=='object' && val.hasOwnProperty('cols') && val.hasOwnProperty('rows'));
}


// interface to the dglux5 application
function onDGFrameMessage(e){
  var data = e.data;
  if (typeof(data)=='object'){
    if (data.hasOwnProperty('dgIframeInit')){
      dgIframeId = data['dgIframeInit'];
      if (window.parent != null){
        // the first post back shouldn't contain any data change
        window.parent.postMessage({'dgIframe':dgIframeId},'*');
      }
    } else if (data.hasOwnProperty('dgIframeUpdate')){
      var updates = data['updates'];
      if (typeof(updates)=='object'){
        if (typeof(dgParams) == 'object'){
          for (key in dgParams){
            if (updates.hasOwnProperty(key)){
              dgParams[key](updates[key]);
            }
          }
        }

        if (typeof(dgParamsUpdated) == 'function'){
          dgParamsUpdated();
        }
      }
    }
  }
}
window.addEventListener('message',onDGFrameMessage);