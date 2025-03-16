<?php

include "../database/db_connect.php";

$sql = "SELECT COUNT(*) AS total FROM questions";

$result = $conn->query($sql);

$questionsTotal;

if($result)
{
    $row = $result->fetch_assoc();
    $questionsTotal = $row["total"];
}
else
{
    $questionsTotal = 0;
}

$conn->close();

?>