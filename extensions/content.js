
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


// content.js

// Check if the module already exists
if (!document.getElementById('my-injected-module')) {
    // Create the module (e.g., a sidebar or widget)
    const module = document.createElement('div');
    module.id = 'my-injected-module';
    module.style.position = 'fixed';
    module.style.bottom = '20px';
    module.style.right = '20px';
    module.style.width = '250px';
    module.style.height = '150px';
    module.style.backgroundColor = 'rgba(91, 238, 100, 0.8)';
    module.style.color = 'white';
    module.style.padding = '20px';
    module.style.borderRadius = '8px';
    module.style.zIndex = '10000';
    module.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.5)';
    module.innerHTML = `
      <h3>ERR 400</h3>
      <p>Hmm... This appears to be a simple prompt.</p>
      <button id="GoogleSearch">Toggle Content</button>
      <div id="moduleContent" style="display:none; margin-top: 10px;">
        <p>Redirect to google.</p> 
      </div>
    `;
    
    // Append the module to the page body
    document.body.appendChild(module);
  
    // Add event listener for toggling content visibility
    const toggleButton = document.getElementById('toggleContent');
    const moduleContent = document.getElementById('moduleContent');
    toggleButton.addEventListener('click', () => {
      moduleContent.style.display = (moduleContent.style.display === 'none') ? 'block' : 'none';
    });
  }
  