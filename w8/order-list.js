// References the table body where order rows will be displayed.
const orderTableBody = document.getElementById('order-table-body');

const tableBody = document.getElementById('order-table-body');

tableBody.addEventListener('click', function(event) {
    const target = event.target;
    
    // 1. Get the ID from the button that was clicked
    const id = target.dataset.id;

    // 2. Guard Clause: If they clicked a row (white space) but NOT a button, 
    // there will be no ID. So we stop the function immediately.
    if (!id) return;

    // 3. Temporary Test: Log the ID to prove it works!
    console.log("Clicked button with ID:", id); 
});

// Renders all orders into the order history table.
export const renderOrders = function (orders) {
    // Clear the table before rendering to prevent duplicate rows.
    orderTableBody.innerHTML = '';

    // Loop through every order in the orders array.
    orders.forEach(function (order) {
        // Create a new table row.
        const row = document.createElement('tr');

        // Add the order information to the row.
        row.innerHTML = `
            <td>${order.timestamp}</td>
            <td>${order.qty}</td>
            <td>${order.size}</td>
            <td>$${order.totalPrice}</td>
            <td>
                <button class="edit-btn" data-id="${order.id}">Edit</button>
                <button class="delete-btn" data-id="${order.id}">Delete</button>
            </td>
        `;

        // Add the new row to the table body.
        orderTableBody.append(row);
    });
};