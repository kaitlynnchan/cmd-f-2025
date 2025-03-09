


document.addEventListener('DOMContentLoaded', function () {
  const popupMessage = document.querySelector('p');
  
  // Dynamically update the popup message
  popupMessage.textContent = "Thanks for using EcoGPT! We're reducing your footprint on ChatGPT.";

  // Retrieve the counter value from chrome.storage
  const queryCountElement = document.getElementById('query-count');
  chrome.storage.sync.get(['counter'], function(result) {
    const counter = result.counter || 0;
    queryCountElement.textContent = `${counter} queries`;
    sendNumRequestsToApi(counter);
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
        updateDashboard(data.data.calculateCarbonFootprint.carbonFootprint, getRealWorldEquivalents(data.data.calculateCarbonFootprint.carbonFootprint));
        
        // openModal(data.data.analyze.queryType, data.data.analyze.url);
    }
} catch (error) {
    console.error('Error sending num requests to API:', error);
}
}
 
function updateDashboard(carbonFootprint, meaning) {
const carbonFootprintElement = document.getElementById('co2-emission');
const meaningElement = document.getElementById('meaning');

carbonFootprintElement.textContent = `${carbonFootprint.toFixed(2)}g of CO2`;

meaningElement.textContent = meaning;
}

function getRealWorldEquivalents(co2) {
    // Constants for CO2 emissions from common activities
    const CO2_IN_CARS = 4040; // CO2 emissions for 25 miles driven (in grams)
    const CO2_GOOGLE_SEARCH = 0.2; // CO2 emissions for one Google search (in grams)
    const CO2_BOILING_KETTLE = 70; // CO2 emissions for boiling a kettle (in grams)
    const CO2_CAR_DRIVE_1KM = 170; // Approximate CO2 emissions for driving 1 km (in grams)
  
    // Handle the case where there is no CO2 emission
    if (co2 === 0) {
      return "The carbon footprint is great! It gives 0 CO2 emissions.";
    }
  
    // Check for very small CO2 emissions like Google searches
    if (co2 < CO2_GOOGLE_SEARCH) {
      return "The carbon footprint is extremely low. It's equivalent to a Google search.";
    }
  
    // Check for CO2 emissions from boiling a kettle
    if (co2 < CO2_BOILING_KETTLE) {
      return "The carbon footprint is relatively low. It's equivalent to boiling a kettle.";
    }
  
    // Check for CO2 emissions equivalent to short-distance driving
    if (co2 < CO2_CAR_DRIVE_1KM) {
      return `The carbon footprint is moderate. It's equivalent to driving a car for a short distance (1-2 km).`;
    }
  
    // For higher emissions, check for driving longer distances
    if (co2 < 500) {
      const kilometers = (co2 / CO2_CAR_DRIVE_1KM).toFixed(2);
      return `The carbon footprint is high. It's equivalent to driving a car for about ${kilometers} kilometers.`;
    }
  
    // For very high emissions, calculate the number of cars driving for 25 miles
    const carsEquivalent = (co2 / CO2_IN_CARS).toFixed(2);
    return `The carbon footprint is very high. It's equivalent to the CO2 emissions of ${carsEquivalent} cars driving for 25 miles.`;
  }
  