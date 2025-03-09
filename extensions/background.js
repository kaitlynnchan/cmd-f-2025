// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'dom-info') {
      console.log('DOM Info:', message.data);
    }
  });
  