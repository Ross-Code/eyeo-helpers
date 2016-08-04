// Add handy toggles for control keys to Webmate's test VM web client

(function(){
  "use strict";

  function setupWebmateUtils()
  {
    function setupKeyToggleButtons()
    {
      let keyTogglesSpan = document.createElement('span');
      keyTogglesSpan.id = "keyToggles";

      function onKeyToggleClick(event)
      {
        let button = event.target;
        let keyCode = button.keyCode;
        let active = button.classList.toggle("active");

        $("#console").wmks("sendKeyCode", keyCode, active ? "keydown" : "keyup");

        // FIXME add a stylesheet for .active instead
        button.style = active ? "font-weight: bold;" : "";

        let scrollX = window.scrollX;
        let scrollY = window.scrollY;
        document.getElementById("mainCanvas").focus();
        window.scrollTo(scrollX, scrollY);

        return false;
      }

      let keys = {
        shift: 16,
        control: 17,
        windows: 91,
        alt: 18
      };
      for (let keyName in keys)
      {
        let button = document.createElement('a');
        button.innerText = keyName;
        button.keyCode = keys[keyName];
        button.addEventListener("click", onKeyToggleClick);
        keyTogglesSpan.appendChild(button);
        keyTogglesSpan.appendChild(document.createTextNode(" "));
      }

      document.getElementById("buttonArea").appendChild(keyTogglesSpan);
    }

    function setupSendString()
    {
      let container = document.createElement('div');
      container.id = "sendStringContainer";
      container.style = "display: inline-block; margin-left: .5rem;";

      let inputField = document.createElement('input');
      inputField.id = "sendStringInput";
      inputField.placeholder = "To be sent...";
      container.appendChild(inputField);

      let inputSend = document.createElement('input');
      inputSend.id = "sendStringSend";
      inputSend.type = "button";
      inputSend.value = "Send";
      container.appendChild(inputSend);

      function onSendClick(event)
      {
        // Works, but loses modifiers. Example "abcABC" ends up sent as "abcabc". 
        $("#console").wmks("sendKeyInput", inputField.value);

        return false;
      }

      inputSend.addEventListener("click", onSendClick);

      document.getElementById("buttonArea").appendChild(container);
    }

    setupKeyToggleButtons();
    setupSendString();
  }



  var script = document.createElement("script");
  script.type = "text/javascript";
  script.text = "(" + setupWebmateUtils.toString() + "());";
  script.async = false;
  document.body.appendChild(script);
  document.body.removeChild(script);
})();
