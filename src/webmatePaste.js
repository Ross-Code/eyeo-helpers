// Adds a method to "paste" text to the VM.

(function(){
  "use strict";

  function setupPaste()
  {
    let container = document.createElement('div');
    container.id = "pasteContainer";
    container.style = "display: inline-block; margin-left: .5rem;";

    let pasteInput = document.createElement('input');
    pasteInput.id = "pasteInput";
    pasteInput.placeholder = "To be pasted...";
    container.appendChild(pasteInput);

    let pasteSend = document.createElement('input');
    pasteSend.id = "pasteSend";
    pasteSend.type = "button";
    pasteSend.value = "Send";
    container.appendChild(pasteSend);

    function onSendClick(event)
    {
      // Works, but loses modifiers. Example "abcABC" ends up sent as "abcabc". 
      $("#console").wmks("sendKeyInput", pasteInput.value);

      return false;
    }

    pasteSend.addEventListener("click", onSendClick);

    document.getElementById("buttonArea").appendChild(container);
  }

  var script = document.createElement("script");
  script.type = "text/javascript";
  script.text = "(" + setupPaste.toString() + "());";
  script.async = false;
  document.body.appendChild(script);
  document.body.removeChild(script);
})();
