// Defines the price of one T-Shirt.
const shirtPrice = 15;

// Defines the price of gift wrapping.
const giftWrapPrice = 2;

// Calculates the total price for an order.
export const calculateTotal = function (orderData) {
    let totalPrice = orderData.qty * shirtPrice;

    // Add gift wrap cost if gift wrap was selected.
    if (orderData.giftWrap) {
        totalPrice += giftWrapPrice;
    }

    return {
        totalPrice: totalPrice
    };
};