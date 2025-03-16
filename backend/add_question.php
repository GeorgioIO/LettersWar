<?php

include "../database/db_connect.php";
header('Content-Type: application/json');

$letter = htmlspecialchars($_POST["letter"]);
$questionText = htmlspecialchars($_POST["text"]);
$answer = htmlspecialchars($_POST["answer"]);


// Errors
if(is_numeric($letter) || is_numeric($questionText) || is_numeric($answer))
{
    $response = ['success' => false , 'message' => "No field can be a number"];
    echo json_encode($response);
    exit;
}
elseif(strcasecmp(substr($answer , 0 , 1) , $letter) != 0)
{
    $response = ['success' => false , 'message' => "The answer first letter is not equal to the letter."];
    echo json_encode($response);
    exit;
}

$letter = strtoupper($letter);

$sql = "INSERT INTO questions (letter , question_text , answer) VALUES ( ? , ? , ?)";

$stmt = $conn->prepare($sql);
if($stmt == false)
{
    die("error preparing statement");
}

$stmt->bind_param("sss" , $letter , $questionText , $answer);

if($stmt->execute())
{
    $response = ['success' => true , 'message' => "New question is added!"];
}
else
{
    $response = ['success' => false , 'message' => "Problem in adding question!"];
}

$stmt->close();
$conn->close();

echo json_encode($response);
exit;
?>