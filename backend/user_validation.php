<?php

session_start();
header('Content-Type: application/json');

$username = $_POST["username"];
$password = $_POST["password"];


if($username == "georgio" && $password == "admin123")
{
    $_SESSION['logged_in'] = true;
    $_SESSION['username'] = $username;

    // Redirect to the admin dashboard
    echo json_encode(["loggingState" => true, "message" => "Login successful"]);
}
else
{
    echo json_encode(["loggingState" => false , "message" => "Credentials are wrong"]);
}

exit;
?>