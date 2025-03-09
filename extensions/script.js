// script.js

document.addEventListener('DOMContentLoaded', function () {
    const popupMessage = document.querySelector('p');
    
    // Dynamically update the popup message
    popupMessage.textContent = "Thanks for using EcoGPT! We're reducing your footprint on ChatGPT.";

    // Retrieve the counter value from chrome.storage
    const queryCountElement = document.getElementById('query-count');
    chrome.storage.sync.get(['counter'], function(result) {
      const counter = result.counter || 0;
      queryCountElement.textContent = `${counter} queries`;
    });
});
