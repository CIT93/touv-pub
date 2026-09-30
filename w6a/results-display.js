// References the order summary container.
const orderSummary = document.getElementById('order-summary');

// References the output spans.
const displayTotal = document.getElementById('display-total');
const displayQty = document.getElementById('display-qty');
const displaySize = document.getElementById('display-size');
const displayGift = document.getElementById('display-gift');

// Displays the completed order.
export const displayOrder = (total, qty, size, gift) => {
    displayTotal.textContent = total;
    displayQty.textContent = qty;
    displaySize.textContent = size;
    
    if (order.giftWrap){
        displayGift.textContent = 'Yes';
    } else {
        displayGift.textContent = 'No';
    }

    orderSummary.style.display = 'block';
};
