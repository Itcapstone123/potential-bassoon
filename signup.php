<?php
$mysqli = new mysqli("127.0.0.1:3306", "u822925530_Itcapstone", "@Itcapstone123", "u822925530_Itcapstone");

if($mysqli === false){
    die("ERROR: Could not connect. " . $mysqli->connect_error);
}

if($_SERVER["REQUEST_METHOD"] == "POST"){
    // Assign form values to variables
    $first_name = $_POST["first_name"];
    $last_name = $_POST["last_name"];
    $email = $_POST["email"];
    $mobile_number = $_POST["mobile_number"];
    $password = $_POST["password"];
    
    $sql = "INSERT INTO users (first_name, last_name, email, mobile_number, password) VALUES (?, ?, ?, ?, ?)";
    
    if($stmt = $mysqli->prepare($sql)){
        $stmt->bind_param("sssss", $first_name, $last_name, $email, $mobile_number, $password);
        
        if($stmt->execute()){
            // Redirect to a success page
            header("location: /login.html");
            exit();
        } else{
            // Display an error message
            echo "Email already in use";
        }

        // Close statement
        $stmt->close();
    }
}


$mysqli->close();
?>
