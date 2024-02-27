function renderCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cartItemsContainer');

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartItemsContainer.innerHTML = cartItems.map(item => {
            return `
                <div class="cart-item">
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <div class="cart-item-details">
                        <p>${item.name} <br> Quantity: <span id="quantity_${item.id}">${item.quantity}</span></p>
                        <div class="quantity-buttons">
                            <button class="increase-btn" data-id="${item.id}">+</button>
                            <button class="decrease-btn" data-id="${item.id}">-</button>
                            <button class="delete-btn" data-id="${item.id}">Delete</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Add event listeners for increase, decrease, and delete buttons
    document.querySelectorAll('.increase-btn').forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
    });

    document.querySelectorAll('.decrease-btn').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', deleteItem);
    });
}

function deleteItem(event) {
    const itemId = parseInt(event.target.dataset.id);
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartItems();
}

function increaseQuantity(event) {
    const itemId = event.target.dataset.id;
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === parseInt(itemId));

    if (itemIndex !== -1) {
        if (cartItems[itemIndex].quantity >= 9) {
            alert('You cannot add more of this item.');
            return;
        }

        cartItems[itemIndex].quantity += 1;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
    }
}

function decreaseQuantity(event) {
    const itemId = event.target.dataset.id;
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === parseInt(itemId));

    if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity -= 1;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    renderCartItems();

    // Add event listener for the clear cart button
    const clearCartBtn = document.getElementById('clearCartBtn');
    clearCartBtn.addEventListener('click', clearCart);
});

function clearCart() {
    localStorage.removeItem('cartItems');
    renderCartItems();
}





    // function renderCartItems() {
    //     const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    //     const cartItemsContainer = document.getElementById('cartItemsContainer');

    //     if (cartItems.length === 0) {
    //         cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    //     } else {
    //         cartItemsContainer.innerHTML = cartItems.map(item => {
    //             return `
    //                 <div class="cart-item">
    //                     <img src="${item.imageUrl}" alt="${item.name}">
    //                     <div class="cart-item-details">
    //                         <p>${item.name} 
    //                         <br> Quantity: <span id="quantity_${item.id}">${item.quantity}</span></p>
    //                         <div class="quantity-buttons">
    //                             <button class="increase-btn" data-id="${item.id}">+</button>
    //                             <button class="decrease-btn" data-id="${item.id}">-</button>
    //                             <button class="delete-btn" data-id="${item.id}">Delete</button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             `;
    //         }).join('');
    //     }

    //     // Add event listeners for increase, decrease, and delete buttons
    //     document.querySelectorAll('.increase-btn').forEach(btn => {
    //         btn.addEventListener('click', increaseQuantity);
    //     });

    //     document.querySelectorAll('.decrease-btn').forEach(btn => {
    //         btn.addEventListener('click', decreaseQuantity);
    //     });

    //     document.querySelectorAll('.delete-btn').forEach(btn => {
    //         btn.addEventListener('click', deleteItem);
    //     });
    // }

    // function deleteItem(event) {
    //     const itemId = parseInt(event.target.dataset.id);
    //     let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    //     cartItems = cartItems.filter(item => item.id !== itemId);
    //     localStorage.setItem('cartItems', JSON.stringify(cartItems));
    //     renderCartItems();
    // }

    // function increaseQuantity(event) {
    //     const itemId = event.target.dataset.id;
    //     let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    //     const itemIndex = cartItems.findIndex(item => item.id === parseInt(itemId));

    //     if (itemIndex !== -1) {
    //         if (cartItems[itemIndex].quantity >= 9) {
    //             alert('You cannot add more of this item.');
    //             return;
    //         }

    //         cartItems[itemIndex].quantity += 1;
    //         localStorage.setItem('cartItems', JSON.stringify(cartItems));
    //         renderCartItems();
    //     }
    // }


    // function decreaseQuantity(event) {
    //     const itemId = event.target.dataset.id;
    //     let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    //     const itemIndex = cartItems.findIndex(item => item.id === parseInt(itemId));

    //     if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
    //         cartItems[itemIndex].quantity -= 1;
    //         localStorage.setItem('cartItems', JSON.stringify(cartItems));
    //         renderCartItems();
    //     }
    // }

    // document.addEventListener('DOMContentLoaded', function () {
    //     renderCartItems();

    //     // Add event listener for the clear cart button
    //     const clearCartBtn = document.getElementById('clearCartBtn');
    //     clearCartBtn.addEventListener('click', clearCart);
    // });

    // function clearCart() {
    //     localStorage.removeItem('cartItems');
    //     renderCartItems();
    // }

    // document.addEventListener('DOMContentLoaded', function () {
    //     renderCartItems();

    //     const clearCartBtn = document.getElementById('clearCartBtn');
    //     clearCartBtn.addEventListener('click', clearCart);
    // });



    // // Function to calculate separate totals for individual items and meals
    // function calculateSeparateTotals(cartItems) {
    //     let individualItemsTotal = 0;
    //     let mealsTotal = 0;

    //     // Separate individual items and meals
    //     const individualItems = cartItems.filter(item => item.category !== "MEAL");
    //     const mealItems = cartItems.filter(item => item.category === "MEAL");

    //     // Calculate total for individual items
    //     individualItemsTotal = individualItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    //     // Calculate total for meals by summing up the meal prices
    //     mealsTotal = mealItems.reduce((total, meal) => {
    //         // Sum the prices of products in the meal
    //         const mealPrice = meal.products.reduce((mealTotal, productId) => {
    //             const product = products.find(product => product.id === productId);
    //             return mealTotal + (product.price * product.quantity);
    //         }, 0);
    //         return total + mealPrice;
    //     }, 0);

    //     return { individualItemsTotal, mealsTotal };
    // }

    // // Function to handle checkout
    // function proceedToCheckout() {
    //     // Retrieve cart items from localStorage or wherever they are stored
    //     const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    //     // Calculate separate totals for individual items and meals
    //     const { individualItemsTotal, mealsTotal } = calculateSeparateTotals(cartItems);

    //     // Display the totals wherever needed (e.g., in the UI)
    //     console.log('Total for Individual Items:', individualItemsTotal);
    //     console.log('Total for Meals:', mealsTotal);

    //     // Optionally, you can clear the cart after checkout
    //     localStorage.removeItem('cartItems');
    //     // Or perform other checkout-related actions
    // }
// cart.js
//import { products } from "./products"; // Make sure to adjust the path if needed

