// cart.js

// Cart Array
var cart = [];

// Function to add a product to the cart
function addToCart(product,quantity) {
    var cartItem = {
        product: product,
        quantity: quantity
      };
    
      // Check if the product already exists in the cart
      var existingItem = cart.find(item => item.product.title === product.title);
    
      if (existingItem) {
        existingItem.quantity += quantity;
        saveCartToStorage();
      } else {
        cart.push(cartItem);
        saveCartToStorage();
      }
    
    
    renderCart();
  }
// Function to calculate the total price of the cart
function calculateTotalPrice() {
  var totalPrice = 0;

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    var product = item.product;
    var quantity = item.quantity;
    var price = product.price;

    totalPrice += price * quantity;
  }

  return totalPrice;
}

// Function to render the cart
function renderCart() {
    var cartContainer = document.getElementById("cart-container");
    var totalPriceElement = document.getElementById("total-price");
  
    cartContainer.innerHTML = "";
    var totalPrice = 0;
  
    for (var i = 0; i < cart.length; i++) {
      var item = cart[i];
  
      cartContainer.innerHTML += `
      <div class="cart-item row align-items-center">
      <div class="col-md-3">
        <img class="img-fluid" src="${item.product.image}" alt="${item.product.title}" />
      </div>
      <div class="col-md-6">
        <h4>${item.product.title}</h4>
        <p>${item.product.price}$</p>
      </div>
      <div class="col-md-3">
        <button class="btn btn-outline-danger btn-sm quantity-btn" onclick="decreaseQuantity(${i})">-</button>
        <span>${item.quantity}</span>
        <button class="btn btn-outline-primary btn-sm quantity-btn" onclick="increaseQuantity(${i})">+</button>
        <button class="btn btn-outline-dark btn-sm remove-btn" onclick="removeFromCart(${i})">Remove</button>
      </div>
    </div>
    
      `;
  
      totalPrice += item.product.price * item.quantity;
    }
  
    totalPriceElement.textContent = "Total Price: " + totalPrice.toFixed(2) + "$";
  }

// Function to increase the quantity of a cart item
function increaseQuantity(index) {
  cart[index].quantity++;
  saveCartToStorage();
  renderCart();
}

// Function to decrease the quantity of a cart item
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  saveCartToStorage();
  renderCart();
}

// Function to remove a cart item
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCartToStorage();
  renderCart();
}

// Function to clear the cart
function clearCart() {
  cart = [];
  localStorage.removeItem('cart');
  renderCart();
}

// Function to save the cart to local storage
function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to load the cart from local storage
function loadCartFromStorage() {
  var storedCart = localStorage.getItem("cart");
  cart = storedCart ? JSON.parse(storedCart) : [];
}

// Load the cart from local storage and render it
loadCartFromStorage();
renderCart();
