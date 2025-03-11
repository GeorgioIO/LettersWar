<?php

$servername = "localhost";
$username = "root";
$password = "";
$db_name = "letterswar";

$conn = new mysqli($servername , $username , $password , $db_name , 3307);
if($conn->connect_error){
    die("Connection error : " . $conn->connect_error);
}




?>