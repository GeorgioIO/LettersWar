<?php

include "../database/db_connect.php";

$sql = "SELECT letter, COUNT(*) as question_count FROM questions GROUP BY letter ORDER BY letter";

$result = $conn->query($sql);

$questions_by_letter = [];
if($result->num_rows != 0)
{
    while($row = $result->fetch_assoc())
    {
        $questions_by_letter[] = $row;
    }
}

$conn->close();

?>