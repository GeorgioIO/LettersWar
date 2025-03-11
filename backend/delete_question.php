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
    echo json_encode(["success" => true , "message" => "Record deleted"]);
    exit;
}
else
{
    echo json_encode(["success" => false , "message" => "Error in deleting record"]);
    exit;
}

$stmt->close();
$conn->close();


?>