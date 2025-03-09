// background.js
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === 'dom-info') {
//       console.log('DOM Info:', message.data);
//     }
//   });
  


chrome.runtime.onInstalled.addListener(() => {
    console.log("Module Injector extension installed!");
  });