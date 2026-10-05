console.log('Hello from app.js! Your JavaScript is connected and running!');

import * as orderHandler from './order-handler.js';
import * as priceCalculator from './price-calculator.js';
import * as resultsDisplay from './results-display.js';
import * as formhandler from './form-handler.js';
import * as orderStorage from './order-storage.js';

// Reference to the order form.
const orderForm = document.getElementById('order-form');

// Stores all submitted orders.
const orders = [];

// Handles the form submission.
const handleOrderSubmit = function (event) {
    event.preventDefault();

    const orderData = orderHandler.getOrderInputs();

    // Calculate the total price.
    const calculatedPrice = priceCalculator.calculateTotal(orderData);

    // Create a new order using the original data,
    // calculated price, and a timestamp.
    const newOrder = {
        ...orderData,
        ...calculatedPrice,
        timestamp: new Date().toISOString()
    };

    // Store the new order
    orders.push(newOrder);

    // Save all orders to localStorage.
    orderStorage.saveOrders(orders);

    // Verify the new orders array.
    resultsDisplay.displayOrder(newOrder);

    // Display the order information.
    console.log(orders);

};

// Initializes the application.
const init = function () {
    console.log('App Initialized');

    // Load previously saved orders.
    const loadedOrders = orderStorage.loadOrders();
    
    if (loadedOrders.length > 0) {
        orders.push(...loadedOrders);
    }
    
    orderForm.addEventListener('submit', handleOrderSubmit);
};

// Start the app when the DOM is ready.
document.addEventListener('DOMContentLoaded', init);