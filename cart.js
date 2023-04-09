var addToCartBtns = document.querySelectorAll('#addToCart');
var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
updateCartCounter();

for (var i = 0; i < addToCartBtns.length; i++) {
  addToCartBtns[i].addEventListener('click', function(event) {
    var productContainer = event.target.closest('.product-item');
    var productTitle = productContainer.querySelector('.product-title a').textContent;
    var productPrice = productContainer.querySelector('.product-price h3').textContent;
    var productImage = productContainer.querySelector('.product-image img').src;

    var itemIndex = cartItems.findIndex(item => item.title === productTitle);
    if (itemIndex > -1) {
      cartItems[itemIndex].quantity++;
    } else {
      cartItems.push({ title: productTitle, price: productPrice, image: productImage, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    updateCartCounter();
    addNewRowInCart(productTitle, productPrice, productImage);
  });
}


function updateCartCounter() {
  var cartCounterElement = document.getElementById('cart-counter');
  var localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  var cartCounter = localCartItems.reduce((acc, item) => acc + item.quantity, 0);
  cartCounterElement.innerHTML = cartCounter;
}

function addNewRowInCart(productTitle, productPrice, productImage) {
  var cartBody = document.getElementById('cart-body');
  var placeholderRow = cartBody.querySelector('#placeholder-row');
  if (placeholderRow) {
    cartBody.removeChild(placeholderRow);
  }

  var cartRow = document.createElement('tr');
  cartRow.classList.add('cart-row');

  var localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  var itemIndex = localCartItems.findIndex(item => item.title === productTitle);
  var quantity = localCartItems[itemIndex].quantity;
  var totalPrice = parseFloat(productPrice.replace('$', '')) * quantity;

  var rowContent = `
    <td>
      <div class="img">
        <a href="#"><img src="${productImage}" alt="Image"></a>
        <p>${productTitle}</p>
      </div>
    </td>
    <td class="cart-price">${productPrice}</td>
    <td class="cart-row">
      <div class="qty">
        <button class="btn-minus"><i class="fa fa-minus"></i></button>
        <input class="cart-input" type="text" value="${quantity}">
        <button class="btn-plus"><i class="fa fa-plus"></i></button>
      </div>
    </td>
    <td>$<span class="cart-total">${totalPrice.toFixed(2)}</span></td>
    <td><button class="btn-delete"><i class="fa fa-trash"></i></button></td>
  `;

  cartRow.innerHTML = rowContent;
  cartBody.appendChild(cartRow);
  calculateSubtotal();
  var btnMinus = cartRow.querySelector('.btn-minus');
  var btnPlus = cartRow.querySelector('.btn-plus');
  var cartInput = cartRow.querySelector('.cart-input');
  var cartTotal = cartRow.querySelector('.cart-total');

  btnMinus.addEventListener('click', function() {
    if (quantity > 1) {
      quantity--;
      updateQuantityAndTotal();
    }
  });

  btnPlus.addEventListener('click', function() {
    quantity++;
    updateQuantityAndTotal();
  });

  function updateQuantityAndTotal() {
    cartInput.value = quantity;
    totalPrice = parseFloat(productPrice.replace('$', '')) * quantity;
    cartTotal.textContent = totalPrice.toFixed(2);

    localCartItems[itemIndex].quantity = quantity;
    localStorage.setItem('cartItems', JSON.stringify(localCartItems));

    updateCartCounter();
    calculateSubtotal();
  }

  var deleteBtn = cartRow.querySelector('.btn-delete');
  deleteBtn.addEventListener('click', function(event) {
    var cartRow = event.target.closest('.cart-row');
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];


    var itemIndex = cartRow.rowIndex - 1;
    cartItems.splice(itemIndex, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));


    cartRow.remove();


    updateCartCounter();
    calculateSubtotal();
    
  });

    
}

function displayCartItems() {
  var localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  for (var i = 0; i < localCartItems.length; i++) {
    var productTitle = localCartItems[i].title;
    var productPrice = localCartItems[i].price;
    var productImage = localCartItems[i].image;

    addNewRowInCart(productTitle, productPrice, productImage);
  }
}


document.getElementById('clear-cart-btn').addEventListener('click', function() {
  // Clear the cart items from local storage
  localStorage.removeItem('cartItems');
  localStorage.removeItem('subtotal');
  localStorage.removeItem('grandTotal');

  updateCartCounter();


  var cartBody = document.getElementById('cart-body');
  while (cartBody.firstChild) {
    cartBody.removeChild(cartBody.firstChild);
  }

  var placeholderRow = document.createElement('tr');
  placeholderRow.setAttribute('id', 'placeholder-row');
  placeholderRow.innerHTML = `
    <td colspan="5" class="text-center">Cart Cleared.</td>
  `;
  cartBody.appendChild(placeholderRow);

  calculateSubtotal();
});

function calculateSubtotal() {
  let cartRows = document.querySelectorAll("#cart-body > tr");
  let subtotal = 0;

  cartRows.forEach((row) => {
    let rowTotalElement = row.querySelector(".cart-total");
    let rowTotal = parseFloat(rowTotalElement.textContent);
    subtotal += rowTotal;
  });

let subtotalElement = document.querySelector(".cart-summary .cart-content p > span");
subtotalElement.textContent = "$" + subtotal.toFixed(2);

let grandTotalElement = document.querySelector(".cart-summary .cart-content h2 > span");
let grandTotal = (subtotal + 8.99).toFixed(2);
grandTotalElement.textContent = "$" + grandTotal;

localStorage.setItem("subtotal", subtotal.toFixed(2));
localStorage.setItem("grandTotal", grandTotal);

}

displayCartItems();
