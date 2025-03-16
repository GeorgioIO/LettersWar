<?php
include "../database/db_connect.php";

$sql = "SELECT * FROM questions ORDER BY Letter ASC";
$result = $conn->query($sql);

$questions = [];

if($result->num_rows != 0){
    while($row = $result->fetch_assoc()){
        $questions[] = $row;
    }
}

$conn->close();


header('Content-Type: application/json');
echo json_encode(['success' => true, 'questions' => $questions]);
exit;
?>