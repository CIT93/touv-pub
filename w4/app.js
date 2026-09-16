console.log('Hello from app.js! Your JavaScript is connected and running!');

import * as orderHandler from './order-handler.js';

// Reference to the order form.
const orderForm = document.getElementById('order-form');

// Referennce to the order summary
const orderSummary = document.getElementById('order-summary');

// Handles the form submission.
const handleOrderSubmit = function(event) {
    event.preventDefault();

    const orderData = orderHandler.getOrderInputs();
    
    let message = `Ordered ${orderData.qty} ${orderData.size} T-Shirts`;
    
    if (orderData.giftWrap === true) {
        message += ' - gift wrapped';
    }

    orderSummary.textContent = message;
};

// Initializes the application.
const init = function() {
    console.log('App Initialized');

    orderForm.addEventListener('submit', handleOrderSubmit);
};

// Start the app when the DOM is ready.
document.addEventListener('DOMContentLoaded', init);