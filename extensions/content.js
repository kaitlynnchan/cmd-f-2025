
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


// This waits till user stops typing 
let typingTimeout;
const intervalId = setInterval(() => {
    const textbox = document.querySelector('#prompt-textarea');

    if (textbox) {
        console.log('Textbox with id "prompt-textarea" found:', textbox);
        clearInterval(intervalId); // Stop the interval once the element is found

        // Set up event listener to detect typing
        textbox.addEventListener('input', () => {
            clearTimeout(typingTimeout); // Clear any previous timeout
            typingTimeout = setTimeout(() => {
                console.log('User has stopped typing.');

                // Get the <p> tag inside the textbox container (you can modify the selector if necessary)
                const pTag = textbox.querySelector('p');  // If there's a <p> tag inside the textbox
                if (pTag) {
                    const userText = pTag.textContent; // Extract text content from <p> tag
                    console.log('User text from <p> tag:', userText);

                    // Send user text to the API or trigger your logic here
                    sendUserTextToApi(userText);


                } else {
                    // If no <p> tag is found, log the content of the textbox itself (or handle it as needed)
                    const userTextFallback = textbox.value; // If it's an input field
                    console.log('No <p> tag found, using fallback text:', userTextFallback);
                   // sendUserTextToApi(userTextFallback);
                }

            }, 1000); // 1 second after the user stops typing
        });
    } else {
        console.log('No textbox with id "prompt-textarea" found');
    }
}, 500); // Check every 500ms (you can adjust the interval as needed)



// Async function to send user text to GraphQL API
async function sendUserTextToApi(userText) {
    const query = `
        query analyze($prompt: String!) {
            analyze(prompt: $prompt) {
                success
                queryType
                url
            }
        }
    `;

    const variables = {
        prompt: userText
    };

    try {
        const response = await fetch('https://cmd-f-2025.onrender.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables
            }),
        });

        const data = await response.json();

        if (data.errors) {
            console.error('GraphQL Error:', data.errors);
        } else {
            console.log('GraphQL Response:', data);
        }
    } catch (error) {
        console.error('Error sending user text to API:', error);
    }
}



// button.addEventListener('mouseover', function() {
//     console.log('Mouse left the "Send prompt" button!');
// });


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
    module.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    module.style.color = 'white';
    module.style.padding = '20px';
    module.style.borderRadius = '8px';
    module.style.zIndex = '10000';
    module.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.5)';
    module.innerHTML = `
      <h3>Injected Module</h3>
      <p>This module was injected into the page.</p>
      <button id="toggleContent">Toggle Content</button>
      <div id="moduleContent" style="display:none; margin-top: 10px;">
        <p>Here is more content.</p>
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
  