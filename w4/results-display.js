// Reference to the order summary.
const orderSummary = document.getElementById('order-summary');

// Reference to the total cost display.
const displayTotal = document.getElementById('display-total');

// Reference to the quantity display.
const displayQty = document.getElementById('display-qty');

// Reference to the size display.
const displaySize = document.getElementById('display-size');

// Reference to the gift wrap display.
const displayGift = document.getElementById('display-gift');

// Displays the order information.
export const displayOrderInfo = function(orderData) {
    displayTotal.textContent = orderData.totalPrice.toFixed(2);
    displayQty.textContent = orderData.qty;
    displaySize.textContent = orderData.size;
    displayGift.textContent = orderData.giftWrap ? 'Yes' : 'No';

    orderSummary.style.display = 'block';
};