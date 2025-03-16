<?php

include "../database/db_connect.php";
header('Content-Type: application/json');

$questionID = (int) htmlspecialchars($_POST["questionID"]);

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


$letter = htmlspecialchars($_POST["letter"]);
$questionText = htmlspecialchars($_POST["questionText"]);
$questionAnswer = htmlspecialchars($_POST["answer"]);


// Errors
if(is_numeric($letter) || is_numeric($questionText) || is_numeric($questionAnswer))
{
    $response = ['success' => false , 'message' => "No field can be a number"];
    echo json_encode($response);
    exit;
}
elseif(strcasecmp(substr($questionAnswer , 0 , 1) , $letter) != 0)
{
    $response = ['success' => false , 'message' => "The answer first letter is not equal to the letter."];
    echo json_encode($response);
    exit;
}

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