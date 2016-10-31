// MTDBackground.js
// Copyright (c) 2015 Dangered Wolf

// Released under the MIT license

if (chrome !== "undefined") {
  chrome.runtime.onMessage.addListener(function(m){
    if (m == "getStorage") {
      chrome.storage.local.get(null, function(items){
        chrome.tabs.query({url: "https://tweetdeck.twitter.com/"}, function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, {"name": "sendStorage", "storage": items});
        });
      });
    } else if (m.name == "setStorage") {
      chrome.storage.local.set(m.content);
    }
  });
}
