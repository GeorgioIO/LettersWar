<?php

include "../database/db_connect.php";

$questionID = htmlspecialchars($_POST["questionID"]);

$sql = "DELETE FROM questions WHERE question_id = ?";

$stmt = $conn->prepare($sql);
if($stmt == false){
    die("error preparing statement");
}

$stmt->bind_param("i" , $questionID);

if($stmt->execute())
{
    $response = ["success" => true , "message" => "Record deleted"];
}
else
{
    $response = ["success" => false , "message" => "Error in deleting record"];
}

$stmt->close();
$conn->close();

echo json_encode($response);
exit;

?>