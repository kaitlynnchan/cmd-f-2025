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
      sendNumRequestsToApi(counter)
    });
});


async function sendNumRequestsToApi(numQueries) {
  const query = `
      query calculateCarbonFootprint($requests: Int!){
        calculateCarbonFootprint(requests: $requests){
          success
          requests
          carbonFootprint
          meaning
        }
      }
  `;

  const variables = {
      requests: numQueries
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
          updateDashboard(data.data.calculateCarbonFootprint.carbonFootprint, data.data.calculateCarbonFootprint.meaning);
          
          // openModal(data.data.analyze.queryType, data.data.analyze.url);
      }
  } catch (error) {
      console.error('Error sending num requests to API:', error);
  }
}

function updateDashboard(carbonFootprint, meaning) {
  const carbonFootprintElement = document.getElementById('co2-emission');
  const meaningElement = document.getElementById('meaning');

  carbonFootprintElement.textContent = `${carbonFootprint}g of CO2`;
  meaningElement.textContent = meaning;
}