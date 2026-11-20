// Key used to store orders in localstorage.
const LOCAL_STORAGE_KEY = 'tshirt_orders_data';

// Saves all orders to localStorage.
export const saveOrders = function (orders) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
};

// Loads orders from localStorage.
export const loadOrders = function () {
    const storedOrders = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedOrders) {
        return JSON.parse(storedOrders);
    }
    
    return [];

};