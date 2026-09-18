console.log('Hello from app.js! Your JavaScript is connected and running!');

import * as orderHandler from './order-handler.js';
import * as priceCalculator from './price-calculator.js';

// Reference to the order form.
const orderForm = document.getElementById('order-form');

// Reference to the order summary
const orderSummary = document.getElementById('order-summary');

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

    // Verify the new orders array.
    console.log(orders);

    let message = `Ordered ${orderData.qty} ${orderData.size} T-Shirts`;

    if (orderData.giftWrap === true) {
        message += ' - gift wrapped';
    }

    orderSummary.textContent = message;
};

// Initializes the application.
const init = function () {
    console.log('App Initialized');

    orderForm.addEventListener('submit', handleOrderSubmit);
};

// Start the app when the DOM is ready.
document.addEventListener('DOMContentLoaded', init);