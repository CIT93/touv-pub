// This module handles displaying and hiding the calculated carbon footprint results on the page.

// Get references to the HTML elements where we will display the results.


const resultsContainer = document.getElementById('results');

// Now, we use resultsContainer.querySelector() to get elements inside the resultsContainer.

const totalFootprintDisplay = resultsContainer.querySelector('#totalFootprint');
const householdFootprintDisplay = resultsContainer.querySelector('#householdFootprint');
const homeSizeFootprintDisplay = resultsContainer.querySelector('#homeSizeFootprint');
const foodDietFootprintDisplay = resultsContainer.querySelector('#foodDietFootprint');
const foodPackagingDisplay = resultsContainer.querySelector('#foodPackagingFootprint');

// Display the calculated results in the respective HTML elements.
// @param {Object} results - An object containing the calculated footprint values (points).
// Update the text content of each display element with the calculated points

export const displayResults = function (results) {
    console.log('inside the displayResults function');
    totalFootprintDisplay.textContent = `${results.totalFootprint.toFixed(0)} Points`;
    householdFootprintDisplay.textContent = `Household Size: ${results.householdFootprint.toFixed(0)} Points`;
    homeSizeFootprintDisplay.textContent = `Home Size: ${results.homeSizeFootprint.toFixed(0)} Points`;
    foodDietFootprintDisplay.textContent = `Food Diet Type: ${results.dietTypeFootprint.toFixed(0)} Points`;
    foodPackagingDisplay.textContent = `Food Packaging: ${results.foodPackagingFootprint.toFixed(0)} Points`;

    // Make the entire results section visible
    resultsContainer.style.display = 'block';
};

// Hides the entire results section.
export const hideResults = function () {
    resultsContainer.style.display = 'none';
};