// MTDLoad.js
// Copyright (c) 2016 Ryan Dolan (dangered wolf)

"use strict";
console.log("MTDLoad 6.0");

var isDev = true, isChromium = typeof chrome !== "undefined", storage = {}, app,BrowserWindow,mainWindow,isFirefox,isSafari;

function InjectDevStyles() {
  console.log("*boops your nose* hey there developer :3");
  console.log("boopstrapping moderndeck.css for extensibility");
  console.log("don't forget to check that moderndeck.css is in manifest.json before shipping, you goof");

  if (isFirefox) {
    var links = document.querySelectorAll("link[title='dark'],link[title='light']");

    for (var i = 0; i < links.length; i++) {
      links[i].href = "";
    }
  }

  var injStyles = document.createElement("link");
  injStyles.rel = "stylesheet";

  if (isChromium) {
    injStyles.href = chrome.extension.getURL("sources/wiki.css");
  } else if (isSafari) {
    injStyles.href = safari.extension.baseURI + "sources/wiki.css";
  } else if (isFirefox) {
    injStyles.href = self.options.ffMTDURLExchange + "sources/wiki.css";
  } else {
    console.log('you done goofed')
  }

  document.head.appendChild(injStyles);
}

if ((typeof localStorage.mtd_stylesheet_dev_mode !== "undefined" && localStorage.mtd_stylesheet_dev_mode === "true") || isDev || isFirefox) {
  InjectDevStyles();
}

console.log("Bootstrapping MTDinject");

var jQueryScr = document.createElement("script");
var InjectScript = document.createElement("script");

jQueryScr.type = "text/javascript";
InjectScript.type = "text/javascript";

function MTDURLExchange(url) {
  var injurl = document.createElement("div");
  injurl.setAttribute("type",url);
  injurl.id = "MTDURLExchange";
  document.head.appendChild(injurl);
  console.log("injected url exchange with id " + injurl.id);
}

if (isChromium) {
  MTDURLExchange(chrome.extension.getURL(""));
  InjectScript.src = chrome.extension.getURL("sources/MTDinject.js");
  jQueryScr.src = chrome.extension.getURL("sources/libraries/jquery.min.js");
} else if (isSafari) {
  MTDURLExchange(safari.extension.baseURI + "/");
  InjectScript.src = safari.extension.baseURI + "sources/MTDinject.js";
  jQueryScr.src = safari.extension.baseURI + "sources/libraries/jquery.min.js";
} else {
  MTDURLExchange(self.options.ffMTDURLExchange);
  InjectScript.src = self.options.ffMTDURLExchange + "sources/MTDinject.js";
  jQueryScr.src = self.options.ffMTDURLExchange + "sources/libraries/jquery.min.js";
}

document.head.appendChild(jQueryScr);
document.head.appendChild(InjectScript);

chrome.runtime.sendMessage("getStorage");

chrome.runtime.onMessage.addListener(function(m) {
  if (m.name == "sendStorage") {
    storage = m.storage;
  }
});

window.addEventListener("message", function(event) {
  if (event.source == window &&
      event.data.type) {
    if (event.data.type == "setStorage") {
      chrome.runtime.sendMessage({"name": "setStorage", "content": event.data.message});
    }
    else if (event.data.type == "getStorage") {
      window.postMessage({
        type: "sendStorage",
        message: storage
      }, "*");
    }
  }
});
