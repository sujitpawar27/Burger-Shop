import { products, meals } from './products.js'

// Assuming these are separate arrays for products and meals
products.forEach(item => createCard(item));
meals.forEach(item => createCard(item));

//filter items
const items = [...products, ...meals];
document.addEventListener("DOMContentLoaded", function () {
  renderCards(products, meals);

  const filterSelect = document.getElementById("filter");
  filterSelect.addEventListener("change", changeCategory);
});

function createCard(item) {
  const cardContainer = document.getElementById("card-container");

  const card = document.createElement("div");
  const btn = document.createElement("button");

  btn.innerHTML = "Add to cart";

  const quantitySelect = document.createElement("select"); // dropdown for selecting quantity

  quantitySelect.innerHTML = createQuantity(); // gives quantity options

  btn.addEventListener("click", function () {
    const quantitySelect = card.querySelector("select"); // Fetch the select element within the card
    const selectedQuantity = +quantitySelect.value;
    addToCart(item, selectedQuantity);
  });
  card.className = "card";
  card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.imageUrl}">
        <h2>${item.name}</h2>
        <p>Price: &#x20B9;${item.price}</p>
        <label for="quantity${item.id}">Quantity:</label>
        <button  
       
    `;
  btn.style.marginLeft = "157px";
  card.style.marginTop = "30px"
  card.appendChild(quantitySelect);
  
  card.appendChild(btn);
  cardContainer.appendChild(card);
}


function createQuantity() {
  let options = '';
  for (let i = 1; i <= 9; i++) {
    options += `<option value="${i}">${i}</option>`;
  }
  return options;
}


//renders the items to cards
function renderCards(products, meals) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  if (products) {
    for (const product of products) {
      createCard(product);
    }
  }

  // Render meals
  if (meals) {
    for (const meal of meals) {
      createCard(meal);
    }
  }
}




// Combine products and meals into one array called 'items'


console.log(items)
const filterSelect = document.getElementById("filter");
filterSelect.addEventListener("change", changeCategory);

function changeCategory() {
  const selectedCategory = filterSelect.value;
  renderFilteredItems(selectedCategory);
}

function renderFilteredItems(selectedCategory) {
  let filteredItems;

  if (selectedCategory.toLowerCase() === "all") {
    renderCards(items); // Display all items
    return;
  } else {
    filteredItems = filterItems(selectedCategory); // Filter items based on the selected category
  }

  renderCards(filteredItems);
}


function filterItems(category) {
  return items.filter(item => item.category.toLowerCase() === category.toLowerCase());
}


document.addEventListener("DOMContentLoaded", function () {
  renderCards(items);


  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );
    renderCards(filteredItems);
  });
});

// Define your items variable globally or within the scope where these functions are available

//need to check the logic
const vegCheckbox = document.getElementById("veg");
const nonVegCheckbox = document.getElementById("nonveg");
const cardContainer = document.getElementById("card-container");

function renderItems(items) {
  cardContainer.innerHTML = "";
  items.forEach(item => createCard(item));
}

function filterItemsByType(type) {
  return items.filter(item => item.type === type);
}

vegCheckbox.addEventListener("change", function () {
  const filteredItems = vegCheckbox.checked ? filterItemsByType("VEG") : items;
  renderItems(filteredItems);
  nonVegCheckbox.checked = false;
});

nonVegCheckbox.addEventListener("change", function () {
  const filteredItems = nonVegCheckbox.checked ? filterItemsByType("NONVEG") : items;
  renderItems(filteredItems);
  vegCheckbox.checked = false;
});
let selectedQuantity;

let cartItems = [];

function addToCart(item, quantity) {
  // Retrieve the existing cart items from localStorage

  if (!quantity) {
    alert("Please select a quantity.");
    return;
  }

  cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

  const totalQuantityInCart = getTotalQuantityInCart(item.id);
  const remainingQuantity = 9 - totalQuantityInCart;

  if (quantity > remainingQuantity) {
    alert(`You can add only ${remainingQuantity} more of this item.`);
    return;
  }

  if (existingItemIndex !== -1) {
    // If the item already exists, update its quantity
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    // If the item is new, add it to the cart with the given quantity
    cartItems.push({ ...item, quantity });
  }

  // Store the updated cart items back in localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  checkForMeal();
  console.log(cartItems)

  // Optionally, you can trigger a UI update or any other action here
  alert(`${quantity} ${item.name}(s) added to cart`);
}

function getTotalQuantityInCart(itemId) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const item = cartItems.find(item => item.id === itemId);
  return item ? item.quantity : 0;
}


// Assuming a function to navigate to the cart page
function navigateToCartPage() {
  window.location.href = 'cart.html';
}

const cartButton = document.querySelector('.cart button');
cartButton.addEventListener('click', navigateToCartPage);


//1 step
//Checking for whether items are part of a meal - Optimizing the bill of customer;
function checkForMeal() {
  //OPTIMIZE THIS CODE
  console.log("check for meal");
  for (let item of meals) {
    const prodArr = item.products;
    // console.log(prodArr);
    let isPresent = false;
    for (let i of prodArr) {
      // console.log(checkForMealItem(i));
      isPresent = checkForMealItem(i);
      if (isPresent === false) break;
    }

    if (isPresent === true) {
      console.log("You have to replace these items with the meal");
      const mealCount = optimizeBill(prodArr);  //getting number of meal that could be made 
      // console.log("mealcount:", mealCount);
      const checkExist = existInCart(item.id, mealCount, prodArr);
      // console.log("checkExist:", checkExist);
      if (!checkExist) {
        cartItems.push(item); //pushing meal on cart item
        addCountToMeal(item.id, mealCount); // adding meals count

        let newArr = cartItems.filter(item => !prodArr.includes(item.id));
        localStorage.setItem('cartItems', JSON.stringify(newArr));
        for (let i of newArr3) {
          newArr.push(i);
        }
        localStorage.setItem('cartItems', JSON.stringify(newArr));
        newArr3 = [];
        setTimeout(function () {
          alert(`Combo found! Discount applied!`);
        }, 1000);
      }
    }
  }
}

//2 step
//checking if item id present in cart items or not
function checkForMealItem(id) {
  let flag = false;
  console.log(cartItems);
  for (let item of cartItems) {
    // console.log("prodArr_id:", id, "cartItems_id:", item.id);
    if (item.id === id) {
      flag = true;
    }
  }
  return flag;
}


//3 step
//optimizing the bill to form meals from selected items
function optimizeBill(prodArr) {
  let m = Number.MAX_VALUE;
  console.log(m);

  for (let item of cartItems) {
    for (let i of prodArr) {
      if (item.id === i) {
        m = Math.min(m, item.quantity);
      }
    }
  }
  for (let i of prodArr) {
    subCount(i, m); // re-adjusting the item count if found to form as meal
  }

  return m;
}

//4 step
//if meal already exist check
function existInCart(id, count, prodArr) {
  for (let item of cartItems) {
    if (item.id === id) {
      item.quantity += count;

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      setTimeout(function () {
        alert(`Combo found! Discount applied!`);
      }, 1000);

      let newArr2 = cartItems.filter(item => !prodArr.includes(item.id));
      localStorage.setItem('cartItems', JSON.stringify(newArr2));

      for (let i of newArr3) {
        newArr2.push(i);
      }
      localStorage.setItem('cartItems', JSON.stringify(newArr2));
      newArr3 = [];

      return true;
    }
  }
  return false;
}

//5 step
//Adding count to optimized bill meal
function addCountToMeal(id, count) {
  for (let item of cartItems) {
    if (item.id === id) {
      item.quantity = count;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }
  return;
}

//6 step
//Adjusting the quantity after converting into meal
let newArr3 = [];
function subCount(id, meal_count) {
  for (let i of cartItems) {
    if (i.id === id && i.quantity > meal_count) {
      i.quantity = i.quantity - meal_count;
      newArr3.push(i);
    }
  }
}
