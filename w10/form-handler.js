// Reference to the order form.
const orderForm = document.getElementById('order-form');

// Reference to the quantity input.
const qtyInput = orderForm.querySelector('#qty');

// Reference to the shirt size radio buttons.
const sizeRadios = orderForm.querySelectorAll('input[name="size"]');

// Reference to the gift wrap checkbox.
const giftWrapInput = orderForm.querySelector('#gift-wrap');

// Gets the selected shirt size.
const getSelectedSize = function () {
    for (const radio of sizeRadios) {
        if (radio.checked) {
            return radio.value;
        }
    }

    return 'Small';
};

// Gets all order input values.
export const getFormInputs = function () {
    return {
        qty: parseInt(qtyInput.value) || 1,
        size: getSelectedSize(),
        giftWrap: giftWrapInput.checked
    };
};

// Clears all input fields and resets the form.
export const clearFormInputs = function () {
    orderForm.reset();
    qtyInput.value = 1;
    sizeRadios[0].checked = true;
    giftWrapInput.checked = false;

    console.log('Clear Form');
};