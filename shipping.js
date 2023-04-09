const shipToCheckbox = document.getElementById('shipto');
const shippingAddressDiv = document.querySelector('.shipping-address');


shippingAddressDiv.style.display = 'none';


shipToCheckbox.addEventListener('change', function() {
  if (this.checked) {
    // Show the shipping address div if the checkbox is checked
    shippingAddressDiv.style.display = 'block';
  } else {
    // Hide the shipping address div if the checkbox is unchecked
    shippingAddressDiv.style.display = 'none';
  }
});

let subtotal = parseFloat(localStorage.getItem("subtotal"));
let grandTotal = parseFloat(localStorage.getItem("grandTotal"));
let cartTotalElement = document.querySelector(".sub-total .cart-total");
let grandTotalElement = document.querySelector(".checkout-summary .total");

if(subtotal && grandTotal) {
  cartTotalElement.setAttribute("value", subtotal.toFixed(2));
  cartTotalElement.textContent = "$" + subtotal.toFixed(2);
  grandTotalElement.textContent = "$" + grandTotal.toFixed(2);
} else {
  cartTotalElement.setAttribute("value", "0");
  cartTotalElement.textContent = "$0";
  grandTotalElement.textContent = "$0";
}

    let items = JSON.parse(localStorage.getItem("cartItems"));

    let productsElement = document.querySelector(".products");


    items.forEach(item => {
      let productElement = document.createElement("span");
      productElement.textContent = item.title;
      productsElement.appendChild(productElement);
      let quantityElement = document.createElement("span");
  quantityElement.textContent = "(" + item.quantity + ")"; 
  productsElement.appendChild(quantityElement);
      let lineBreak = document.createElement("br"); 
      productsElement.appendChild(lineBreak);
    });
