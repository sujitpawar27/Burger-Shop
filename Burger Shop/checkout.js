// import { meals } from "./products";


document.addEventListener('DOMContentLoaded', function () {
    renderCheckoutItems();
});

function renderCheckoutItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const checkoutItemsContainer = document.getElementById('checkoutItemsContainer');
    const totalAmountElement = document.getElementById('totalAmount');

    if (cartItems.length === 0) {
        checkoutItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalAmountElement.textContent = 'Total: ₹0.00'; // Update total amount
    } else {
        // Separate items into meals and individual items
        const { mealsBill, individualItemsBill } = optimizeBill(cartItems);

        // Display individual items
        checkoutItemsContainer.innerHTML = individualItemsBill.map(item => {
            return `
                <div class="checkout-item">
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <div class="checkout-item-details">
                        <p>${item.name} - Quantity: ${item.quantity}</p>
                        <p>Price: ₹${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                </div>
            `;
        }).join('');

        // Display meals
        checkoutItemsContainer.innerHTML += mealsBill.map(meal => {
            return `
                <div class="checkout-item">
                    <img src="path-to-meal-image" alt="${meal.name}">
                    <div class="checkout-item-details">
                        <p>${meal.name} - Quantity: ${meal.itemCount}</p>
                        <p>Price: ₹${(meal.price * meal.itemCount).toFixed(2)}</p>
                    </div>
                </div>
            `;
        }).join('');

        // Calculate and display the total amount
        const totalAmount = calculateTotalAmount([...individualItemsBill, ...mealsBill]);
        totalAmountElement.textContent = ` ₹${totalAmount.toFixed(2)}`;
    }
}

// // Function to optimize the bill by separating meals and individual items
// function optimizeBill(cartItems) {
//     const mealsBill = [];
//     const individualItemsBill = [];

//     for (const item of cartItems) {
//         if (isItemPartOfMeal(item.id)) {
//             mealsBill.push({ ...item });
//         } else {
//             individualItemsBill.push({ ...item });
//         }
//     }

//     return { mealsBill, individualItemsBill };
// }

// // Function to check if an item is part of a meal
// function isItemPartOfMeal(itemId) {
//     // Assuming you have a global map named 'itemToMealMap'
//     return itemToMealMap.has(itemId);
// }


// const itemToMealMap = new Map();
// for (const meal of meals) {
//     for (const productId of meal.products) {
//         if (!itemToMealMap.has(productId)) {
//             itemToMealMap.set(productId, [meal.id]);
//         } else {
//             itemToMealMap.get(productId).push(meal.id);
//         }
//     }
// }


const itemToMealMap = new Map();

for (const meal of meals) {
  const { id: mealId, products } = meal;

  for (const productId of products) {
    if (!itemToMealMap.has(productId)) {
      itemToMealMap.set(productId, [mealId]);
      console.log(itemToMealMap)
    } else {
      itemToMealMap.get(productId).push(mealId);
    }
  }
}

// Function to check if an item is part of a meal
function isItemPartOfMeal(itemId) {
    return itemToMealMap.has(itemId);
}

// Use the isItemPartOfMeal function to optimize the bill
function optimizeBill(cartItems) {
    const mealsBill = [];
    const individualItemsBill = [];

    for (const item of cartItems) {
        if (isItemPartOfMeal(item.id)) {
            mealsBill.push({ ...item });
        } else {
            individualItemsBill.push({ ...item });
        }
    }

    return { mealsBill, individualItemsBill };
}

function calculateTotalAmount(cartItems) {
    let totalAmount = 0;

    // Calculate total amount by summing up the price of each item
    for (const item of cartItems) {
        totalAmount += item.price * item.quantity;
    }

    return totalAmount;
}

// Function to show the user details modal
function showOrderDetailsForm() {
    const modal = document.getElementById('userDetailsModal');
    modal.style.display = 'block';
}

// Function to close the user details modal
function closeUserDetailsModal() {
    const modal = document.getElementById('userDetailsModal');
    modal.style.display = 'none';
}

// Function to submit user details and show the order confirmation
function submitUserDetails(event) {
    event.preventDefault();

    const userName = document.getElementById('userName').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const address = document.getElementById('address').value;

    if (userName && mobileNumber && address) {
        closeUserDetailsModal();

        // Redirect to the order accepted page with query parameters
        const queryParams = `?name=${encodeURIComponent(userName)}&mobile=${encodeURIComponent(mobileNumber)}&address=${encodeURIComponent(address)}`;
        window.location.href = `order_accepted.html${queryParams}`;
    } else {
        alert('Please fill in all the details.');
    }
}