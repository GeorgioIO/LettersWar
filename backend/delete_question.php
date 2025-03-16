<?php

include "../database/db_connect.php";

$questionID = htmlspecialchars($_POST["questionID"]);

// Check if a question with this id is found.
$sql = "SELECT * FROM questions WHERE question_id = ?";
$stmt = $conn->prepare($sql);
if($stmt == false)
{
    die("error preparing statement");
}
$stmt->bind_param("i" , $questionID);

if($stmt->execute())
{
    $result = $stmt->get_result();
    if($result->num_rows == 0)
    {
        $response = ["success" => false , "message" => "No question found."];
        echo json_encode($response);
        exit;
    }
}

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