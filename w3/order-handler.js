// Reference to the Quantity input.
const quantityInput = document.getElementById('qty');

// Reference to the Gift Wrap checkbox.
const giftWrapCheckbox = document.getElementById('gift-wrap');

// Reference to all Size radio buttons.
const sizeRadios = document.querySelectorAll('input[name="size"]');

const getSelectedRadioValue = function(radioButtons){
    
    for (const radio of radioButtons) {
        if (radio.checked === true) {
            return radio.value;
        }
    }
};

// Main function to get all order inputs.
export const getOrderInputs = function(){

    return {
        qty: parseInt(quantityInput.value),
        size: getSelectedRadioValue(sizeRadios),
        giftWrap: giftWrapCheckbox.checked
    };
};