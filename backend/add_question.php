<?php

include "../database/db_connect.php";
header('Content-Type: application/json');

$letter = htmlspecialchars($_POST["letter"]);
$questionText = htmlspecialchars($_POST["text"]);
$answer = htmlspecialchars($_POST["answer"]);

$sql = "INSERT INTO questions (letter , question_text , answer) VALUES ( ? , ? , ?)";

$stmt = $conn->prepare($sql);
if($stmt == false)
{
    die("error preparing statement");
}

$stmt->bind_param("sss" , $letter , $questionText , $answer);

if($stmt->execute())
{
    echo json_encode(['success' => true , 'message' => "New question is added"]);
    exit;
}
else
{
    echo json_encode(['success' => false , 'message' => "Problem in adding question"]);
    exit;
}

$stmt->close();
$conn->close();
?>