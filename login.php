<?php
session_start();

$host = '127.0.0.1:3306';
$user = 'u822925530_Itcapstone';
$pass = '@Itcapstone123';
$dbname = 'u822925530_Itcapstone';
$conn = mysqli_connect($host, $user, $pass, $dbname);

if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);

        if (($password == $row['password'])) {
            $_SESSION['email'] = $row['email'];
            header('Location: indexs.html'); // Replace with your home page URL
        } else {
            // Password is incorrect
            echo 'Invalid email or password';
        }
    } else {
        // User not found
        echo 'Invalid email or password';
    }
}

mysqli_close($conn);
?>
