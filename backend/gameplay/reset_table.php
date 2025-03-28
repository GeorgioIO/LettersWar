<?php
include "../../database/db_connect.php";

$sql = "DELETE FROM used_questions";
$result = $conn->query($sql);

$conn->close();
?>