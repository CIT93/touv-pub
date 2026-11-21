console.log('Hello from app.js! Your JavaScript is connected and running!');

import * as orderHandler from './order-handler.js';
import * as priceCalculator from './price-calculator.js';
import * as orderList from './order-list.js';
import * as formhandler from './form-handler.js';
import * as orderStorage from './order-storage.js';

// Reference to the order form.
const orderForm = document.getElementById('order-form');

// Stores all submitted orders.
const orders = [];

// app.js
const handleDelete = function(id) {
    const orderIndex = orders.findIndex(function(order) {
        return order.id === id;
    });
    
    if (orderIndex !== -1) {
        orders.splice(orderIndex, 1);
    }
    
    orderStorage.saveOrders(orders);
    
    orderList.renderOrders(orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });
};

const handleEdit = function(id) {
    const order = orders.find(function(order) {
        return order.id === id;
    });

    if (!order) return;

    document.getElementById('qty').value = order.qty;
    document.querySelector('input[name="size"][value="' + order.size + '"]').checked = true;
    document.getElementById('gift-wrap').checked = order.giftWrap;
    document.getElementById('order-id').value = order.id;
};

// Handles the form submission.
const handleOrderSubmit = function (event) {
    event.preventDefault();

    const orderData = orderHandler.getOrderInputs();

    // Calculate the total price.
    const calculatedPrice = priceCalculator.calculateTotal(orderData);
    
    // Get the hidden order ID.
    const orderId = document.getElementById('order-id').value;

    if (orderId) {
        // Find the existing order.
        const orderIndex = orders.findIndex(function(order) {
            return order.id === orderId;
        });

        if (orderIndex !== -1) {
            // Update the existing order.
            orders[orderIndex] = {
                ...orders[orderIndex],
                ...orderData,
                totalPrice: calculatedPrice
            };
        }

    } else {
        // Create a completely new order.
        const newOrder = {
            id: Date.now().toString(),
            ...orderData,
            totalPrice: calculatedPrice,
            timestamp: new Date().toISOString()
        };

        orders.push(newOrder);
    }

    // Save all orders.
    orderStorage.saveOrders(orders);

    //Re-render the table.
    orderList.renderOrders(orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });

    // Clear the hidden ID.
    document.getElementById('order-id').value = '';

    //Reset the form.
    orderForm.reset();

    console.log(orders);
    
};

// Initializes the application.
const init = function () {
    console.log('App Initialized');

    // Load previously saved orders.
    const loadedOrders = orderStorage.loadOrders();
    
    if (loadedOrders.length > 0) {
        orders.push(...loadedOrders);
        // Render the full list instead of just the last one
        orderList.renderOrders(orders, {
            onDelete: handleDelete,
            onEdit: handleEdit
        });
    }
    
    orderForm.addEventListener('submit', handleOrderSubmit);
};

// Start the app when the DOM is ready.
document.addEventListener('DOMContentLoaded', init);