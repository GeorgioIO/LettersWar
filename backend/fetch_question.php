<?php

include "../database/db_connect.php";

$questionID = htmlspecialchars($_POST["questionID"]);

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
    if($result->num_rows > 0)
    {
        $question = $result->fetch_assoc();
        $response = ["success" => true , "data" => $question];
    }
    else
    {
        $response = ["success" => true , "data" => "No question found"];
    }
}
else
{
    $response = ["success" => false , "message" => "Error Fetching question"];
}

$stmt->close();
$conn->close();

echo json_encode($response);
exit;

?>