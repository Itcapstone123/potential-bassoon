<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Retrieve the form data
  $billingFirstName = $_POST["billing-first-name"];
  $billingLastName = $_POST["billing-last-name"];
  $billingEmail = $_POST["billing-email"];
  $billingMobile = $_POST["billing-mobile"];
  $billingAddress = $_POST["billing-address"];
  $billingCountry = $_POST["billing-country"];
  $billingCity = $_POST["billing-city"];
  $billingState = $_POST["billing-state"];
  $billingZip = $_POST["billing-zip"];
  $shippingFirstName = $_POST["shipping-first-name"];
  $shippingLastName = $_POST["shipping-last-name"];
  $shippingEmail = $_POST["shipping-email"];
  $shippingMobile = $_POST["shipping-mobile"];
  $shippingAddress = $_POST["shipping-address"];
  $shippingCountry = $_POST["shipping-country"];
  $shippingCity = $_POST["shipping-city"];
  $shippingState = $_POST["shipping-state"];
  $shippingZip = $_POST["shipping-zip"];
  $paymentMethod = $_POST["payment"];
  $productName = $_POST["product-name"];
  $grandTotal = $_POST["grand-total"];

    $servername = "127.0.0.1:3306";
    $username = "u822925530_Itcapstone";
    $password = "@Itcapstone123";
    $dbname = "u822925530_Itcapstone";
  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "INSERT INTO orders (billing_first_name, billing_last_name, billing_email, billing_mobile, billing_address, billing_country, billing_city, billing_state, billing_zip, shipping_first_name, shipping_last_name, shipping_email, shipping_mobile, shipping_address, shipping_country, shipping_city, shipping_state, shipping_zip, payment_method, product_names, grand_total)
  VALUES ('$billingFirstName', '$billingLastName', '$billingEmail', '$billingMobile', '$billingAddress', '$billingCountry', '$billingCity', '$billingState', '$billingZip', '$shippingFirstName', '$shippingLastName', '$shippingEmail', '$shippingMobile', '$shippingAddress', '$shippingCountry', '$shippingCity', '$shippingState', '$shippingZip', '$paymentMethod', '$productName', '$grandTotal')";

  if ($conn->query($sql) === TRUE) {
    echo "Order placed successfully!";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

  $conn->close();
}
?>
