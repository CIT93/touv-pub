console.log('Hello from app.js! Your JavaScript is connected and running!');

// Week 5.1: Now save entries to localStorage after submission.
import * as formHandler from './form-handler.js';
import * as calculator from './calculator.js';
import * as resultsDisplay from './results-display.js';
import * as storage from './storage.js';
import * as tableRenderer from './table-renderer.js';

// We will modify the handleFormSubmit function to trigger the table update after a new entry.
// We will modify the init function to render the table immediately on page load with any loaded data.

// Declare a 'const' array to hold all submitted carbon footprint entries in memory.
// We use 'const' because the 'carbonFootprintEntries' variable will always refer
// to the same array, even though the array's contents will change (items added).
const carbonFootprintEntries = []; //Array Literal - Global Variable

// References the main carbon footprint form.
const carbonFootprintForm = document.getElementById('carbonFootprintForm');

// References the Clear Form button.
const clearFormButton = document.getElementById('clearFormButton');

// Get reference to Clear All Data button
const clearAllDataButton = document.getElementById('clearAllDataButton');

// State variables for in-line confirmation of "Clear All Data" button.
let isClearAllDataConfirmed = false; // Tracks if the button is in a "confirming" state.
let clearAllDataTimeout = null; // Stores the ID returned by setTimeout, so we can cancel it.

// Resets the "Clear All Data" button to its original text and appearance.
const resetClearAllDataButton = function () {
    // Clears any pending confirmation timeout.
    
    if (isClearAllDataConfirmed) {
        // If a timeout is active (meaning the button is in a confirming state), clear it.
        clearTimeout(clearAllDataTimeout);
    }
    // Reset the confirmation state
    isClearAllDataConfirmed = false;
    // Restore original button text and remove any special styling class.
    clearAllDataButton.textContent = 'Clear All Saved Data';
    clearAllDataButton.classList.remove('danger-button');
    clearAllDataButton.classList.remove('confirming');
    // Re-add danger-button if it was removed (it's part of initial styling)
    clearAllDataButton.classList.add('danger-button');
};

// Resets all UI-related confirmation states across the application.
const resetAllUIStates = function() {
    // This function is called when major actions (like form submit, clear, delete) occur, ensuring a clean UI state.
    // add to any function that updates DOM
    // This will be expanded in later weeks to include table row confirmations
    resetClearAllDataButton();
    tableRenderer.resetRowConfirmationState();
};

// Handles form submission and collects the household member count.
// calculating footprint, creating a new entry, and saving it to local storage.
const handleFormSubmit = function (event) {
    event.preventDefault();
    const formData = formHandler.getFormInputs();
    //console.log(formData);
    const calculatedResults = calculator.calculateFootprint(formData);

    // Combine the input data with the calculated results into a single entry object.
    // Date.now() gives milliseconds since Jan 1, 1970. .toISOString() formats it nicely.
    // Use the spread operator '...' to quickly copy all properties from formData
    // Copy all properties from calculatedResults
    // Add a timestamp for when this entry was created.
    // Date.now() gives milliseconds since Jan 1, 1970. .toISOString() formats it nicely.
    const newEntry = {
        ...formData,
        ...calculatedResults,
        id: storage.generateUniqueID(),
        timestamp: new Date().toISOString()
    };

    // Add the new entry to our 'carbonFootprintEntries' array.
    carbonFootprintEntries.push(newEntry);
    // Log the full array!
    console.log(carbonFootprintEntries);
    // Save the entire 'carbonFootprintEntries' array to localStorage using our storage module.
    storage.saveEntries(carbonFootprintEntries);
    // console.log(calculatedResults);
    resultsDisplay.displayResults(calculatedResults);
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    resetAllUIStates();
};

// New function to perform the actual clearing of all saved data.
const performClearAllData = function () {
    // Setting length to 0 efficiently clears the array while keeping its const reference.
    carbonFootprintEntries.length = 0;
    console.log("In-memory array cleared:", carbonFootprintEntries);
    storage.clearAllData();
    // Re-render table (will show "No entries")
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    // Clear the form inputs
    formHandler.clearFormInputs();
    // Hide the results section
    resultsDisplay.hideResults();
    resetAllUIStates();
};

// Handles clearing and resetting the form.
const handleClearForm = function () {
    formHandler.clearFormInputs();
    resultsDisplay.hideResults();
    console.log('Clear Form button clicked');
    resetAllUIStates();
};

// Handles the "Delete" action for a specific entry.
const handleDeleteEntry = function(id) {
    console.log(`Delete button clicked for ID: ${id} functionality added in week 7`);
    // 1. Find the index of the entry to delete in our in-memory array.
    const indexToDelete = carbonFootprintEntries.findIndex(function(entry) {
        return String(entry.id) === String(id);
    });
    if(indexToDelete !== -1) {
        // 2. Remove the entry from the in-memory array using splice().
        carbonFootprintEntries.splice(indexToDelete, 1);
        console.log(`Entry removed from memory.`);
        // 3. Save the modified (smaller) array back to localStorage.
        storage.saveEntries(carbonFootprintEntries);
        // 4. Re-render the table to reflect the deletion.
        tableRenderer.renderTable(carbonFootprintEntries, {
            onDelete: handleDeleteEntry,
            onEdit: handleEditEntry
        });
        // 5. If the table is now empty, hide the results section and clear the form.
        if(carbonFootprintEntries.length === 0) {
            resultsDisplay.hideResults();
            formHandler.clearFormInputs();
        }
        // Reset states even if entry not found (e.g., error case)
        resetAllUIStates();
    } else {
        console.log(`Did not find index`)
        resetAllUIStates();
    }
    
};

// Handles the "Edit" action for a specific entry.
const handleEditEntry = function(id) {
    console.log(`Edit button clicked for ID: ${id} functionality added in week 7`);

    resetAllUIStates();
};

// Initializes the application and attaches event listeners.
const init = function () {
    console.log('App initialized: DOM is ready! Try submitting the form or clearing it.');
    carbonFootprintForm.addEventListener('submit', handleFormSubmit);
    clearFormButton.addEventListener('click', handleClearForm);
    resultsDisplay.hideResults();
    // On startup, attempt to load any previously saved entries from localStorage.
    const loadedEntries = storage.loadEntries();
    if (loadedEntries.length > 0) {
        // If no data is found in localStorage, return an empty array.
        // carbonFootprintEntries array using the spread operator (...).
        carbonFootprintEntries.push(...loadedEntries);
        console.log('Entries loaded from localStorage');
    } else {
        console.log('No entries found in localStorage Starting fresh');
    };
    
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    // init function - Event listener for "Clear All Data"
    clearAllDataButton.addEventListener('click', function(event){
        event.stopPropagation(); // Prevents this click from potentially triggering other global click listeners.
        if(isClearAllDataConfirmed) {
            // Second click: User confirms, so perform the action.
            performClearAllData();
        } else {
            // First click: Ask for confirmation by changing button text and state.
            isClearAllDataConfirmed = true;
            clearAllDataButton.textContent = 'Are you sure? Click again';
            // Add a class to change its appearance (defined in style.css).
            clearAllDataButton.classList.add('confirming');
            // Set a timeout to automatically revert the button state if the user doesn't click again.
            clearAllDataTimeout = setTimeout(function () {
                resetClearAllDataButton();
                console.log('Clear All confirmation timed out');
            }, 3000); // 3 seconds
        }
    });
    // Global click listener to reset the "Clear All Data" button state
    // if the user clicks anywhere else on the page while confirmation is pending.
    // Only reset if we are in a confirming state AND the click was outside the button itself.

    document.addEventListener('click', function(event) {
        console.log(event.target);
        if (isClearAllDataConfirmed && event.target !== clearAllDataButton) {
            resetClearAllDataButton();
        }
    });
};

// Waits for the DOM to finish loading before initializing the application.
document.addEventListener('DOMContentLoaded', init);