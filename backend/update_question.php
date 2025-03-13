<?php

include "../database/db_connect.php";
header('Content-Type: application/json');

$questionID = (int) htmlspecialchars($_POST["questionID"]);
$letter = htmlspecialchars($_POST["letter"]);
$questionText = htmlspecialchars($_POST["questionText"]);
$questionAnswer = htmlspecialchars($_POST["answer"]);

$sql = "UPDATE questions SET letter = ?, question_text = ?, answer = ? WHERE question_id = ?";

$stmt = $conn->prepare($sql);

if($stmt == false)
{
    die("error preparing statement");
}

$stmt->bind_param("sssi" , $letter , $questionText , $questionAnswer , $questionID);

if($stmt->execute())
{
    $response = ["success" => true , "message" => "Record is updated"];
}
else
{
    $response = ["success" => false , "message" => "Error updating record"];
}


$stmt->close();
$conn->close();

echo json_encode($response);
exit;
?>