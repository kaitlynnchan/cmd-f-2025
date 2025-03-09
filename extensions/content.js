// content.js

// Check if we're on chatgpt.com
if (window.location.hostname === 'chatgpt.com') {
    console.log("We are on ChatGPT!");
    // Trigger the popup or show something on the page
    alert("Welcome to ChatGPT, powered by EcoGPT!");
} else {
    console.log("Not on ChatGPT.com, current hostname:", window.location.hostname);
}

// // content.js
// const domInfo = {
//     title: document.title,
//     url: window.location.href,
//     html: document.documentElement.outerHTML,
//     body: document.body.innerHTML
//   };
  
//   console.log(domInfo);
//   // You can also send the data to your background script or popup
//   chrome.runtime.sendMessage({ action: 'dom-info', data: domInfo });
  
const domInfo = {
    html: document.documentElement.outerHTML,
    body: document.body.innerHTML
};


// Example: Find button with a specific aria-label inside the body
const button = document.body.querySelector('button[aria-label="Send prompt"]');
if (button) {
    console.log('Button with aria-label "Send prompt" found:', button);
} else {
    console.log('No button with aria-label "Send prompt" found');
}

