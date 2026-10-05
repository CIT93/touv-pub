// References the table body where order rows will be displayed.
const orderTableBody = document.getElementById('order-table-body');

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
            <td></td>
        `;

        // Add the new row to the table body.
        orderTableBody.append(row);
    });
};