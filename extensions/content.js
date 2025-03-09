
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
            const button = document.body.querySelector('button[aria-label="Send prompt"]');
            if (button) {
                // console.log('Button with aria-label "Send prompt" found:', button);
                button.addEventListener('click', function() {
                    console.log('Mouse left the "Send prompt" button!');
                    incrementCounter();
                });
            } else {
                // console.log('No button with aria-label "Send prompt" found');
            }

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
            
            openModal(data.data.analyze.queryType, data.data.analyze.url);
        }
    } catch (error) {
        console.error('Error sending user text to API:', error);
    }
}



// button.addEventListener('mouseover', function() {
//     console.log('Mouse left the "Send prompt" button!');
// });

function openModal(queryType, url) {
  const textbox = document.querySelector('#prompt-textarea');

  // Check if the module already exists
  if (!document.getElementById('my-injected-module')) {

    // Create the module (e.g., a sidebar or widget)
    const module = document.createElement('div');
    module.id = 'my-injected-module';
    module.style.position = 'absolute';
    module.style.width = '350px';
    module.style.height = 'auto';
    module.style.color = '#28430A';
    module.style.padding = '20px';
    module.style.borderRadius = '30px';
    module.style.zIndex = '10000';
    module.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.5)';
    module.style.top = '-300px';
    module.style.right = '0px';
    module.style.border = '5px solid transparent';
    module.style.background = 'linear-gradient(#E5FFE7, white) padding-box, linear-gradient(to right, #A7D930, #7B4425) border-box';
    module.style.display = 'block';

    if (queryType == "COMPLEX") {
      module.style.top = '-150px';
      module.innerHTML = `
        <h3>EcoAI Assistant here!</h3>
        <p style="padding: 10px 0;">I have analyzed your prompt and found that using generative is fine!</p>
      `;
    } else {
      module.innerHTML = `
        <h3>EcoAI Assistant here!</h3>
        <p style="padding: 10px 0;">I have analyzed your prompt and found that is more efficient to use a google search than using a generative AI request</p>
        <p style="padding: 10px 0;">Try reducing your carbon footprint by using the following resources instead:</p>
        <a class="GoogleSearch" href="${url}"' target="_new" rel="noopener" style="color: #0022FF;">${url}</a>
      `;
    }
    
    // Append the module to the page body
    textbox.parentNode.appendChild(module);

  } else {
    // If the module already exists, update its content and show it
    const existingModule = document.getElementById('my-injected-module');
    if (queryType == "COMPLEX") {
        existingModule.style.top = '-150px';
        existingModule.innerHTML = `
            <h3>EcoAI Assistant here!</h3>
            <p style="padding: 10px 0;">I have analyzed your prompt and found that using generative is fine!</p>
        `;
    } else {
        existingModule.innerHTML = `
            <h3>EcoAI Assistant here!</h3>
            <p style="padding: 10px 0;">I have analyzed your prompt and found that it is more efficient to use a google search than using a generative AI request</p>
            <p style="padding: 10px 0;">Try reducing your carbon footprint by using the following resources instead:</p>
            <a class="GoogleSearch" href="${url}" target="_new" rel="noopener" style="color: #0022FF;">${url}</a>
        `;
    }
    existingModule.style.display = 'block';
  }
}

function incrementCounter() {
  chrome.storage.sync.get(['counter'], function(result) {
      let counter = result.counter || 0;
      counter += 1;
      chrome.storage.sync.set({ counter: counter }, function() {
          console.log('Counter incremented to:', counter);
      });
  });
}