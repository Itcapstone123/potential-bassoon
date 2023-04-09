document.getElementById("placeOrderButton").addEventListener("click", function() {
  var billingFirstName = document.getElementById("billing-first-name").value;
  var billingLastName = document.getElementById("billing-last-name").value;
  var billingEmail = document.getElementById("billing-email").value;
  var billingMobile = document.getElementById("billing-mobile").value;
  var billingAddress = document.getElementById("billing-address").value;
  var billingCountry = document.getElementById("billing-country").value;
  var billingCity = document.getElementById("billing-city").value;
  var billingState = document.getElementById("billing-state").value;
  var billingZip = document.getElementById("billing-zip").value;
  var grandTotal = parseFloat(localStorage.getItem("grandTotal"));
  var items = JSON.parse(localStorage.getItem("cartItems"));
var productNames = [];

for (var i = 0; i < items.length; i++) {
  if (items[i].quantity > 1) {
    productNames.push(items[i].title.replace(/'/g, "") + " (" + items[i].quantity + ")");
  } else {
    productNames.push(items[i].title.replace(/'/g, ""));
  }
}

var productName = productNames.join(", ");
  var shipToDifferentAddress = document.getElementById("shipto").checked;
  var shippingFirstName, shippingLastName, shippingEmail, shippingMobile, shippingAddress, shippingCountry, shippingCity, shippingState, shippingZip;

  if (shipToDifferentAddress) {
    shippingFirstName = document.getElementById("shipping-first-name").value;
    shippingLastName = document.getElementById("shipping-last-name").value;
    shippingEmail = document.getElementById("shipping-email").value;
    shippingMobile = document.getElementById("shipping-mobile").value;
    shippingAddress = document.getElementById("shipping-address").value;
    shippingCountry = document.getElementById("shipping-country").value;
    shippingCity = document.getElementById("shipping-city").value;
    shippingState = document.getElementById("shipping-state").value;
    shippingZip = document.getElementById("shipping-zip").value;
  } else {
    shippingFirstName = billingFirstName;
    shippingLastName = billingLastName;
    shippingEmail = billingEmail;
    shippingMobile = billingMobile;
    shippingAddress = billingAddress;
    shippingCountry = billingCountry;
    shippingCity = billingCity;
    shippingState = billingState;
    shippingZip = billingZip;
  }

  var paymentMethod = document.querySelector('input[name="payment"]:checked').nextElementSibling.textContent;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.responseText);
    }
  };
  xhttp.open("POST", "insert_order.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("billing-first-name=" + billingFirstName + "&billing-last-name=" + billingLastName + "&billing-email=" + billingEmail + "&billing-mobile=" + billingMobile + "&billing-address=" + billingAddress + "&billing-country=" + billingCountry + "&billing-city=" + billingCity + "&billing-state=" + billingState + "&billing-zip=" + billingZip + "&shipping-first-name=" + shippingFirstName + "&shipping-last-name=" + shippingLastName + "&shipping-email=" + shippingEmail + "&shipping-mobile=" + shippingMobile + "&shipping-address=" + shippingAddress + "&shipping-country=" + shippingCountry + "&shipping-city=" + shippingCity + "&shipping-state=" + shippingState + "&shipping-zip=" + shippingZip + "&payment=" + paymentMethod + "&product-name=" + productName + "&grand-total=" + grandTotal);
});
