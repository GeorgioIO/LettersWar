<?php

include "../../database/db_connect.php";
header('Content-Type: application/json');


$letter = htmlspecialchars($_POST["letter"]);

// Function to fetch a random question that is not used
function fetchUniqueQuestion($letter, $conn) {
    // Fetch a random question for the given letter
    $sql = "SELECT * FROM questions WHERE letter = ? ORDER BY RAND() LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $letter);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $question = $result->fetch_assoc();
        $stmt->close();
        return $question;
    } else {
        return null; // In case of failure to fetch
    }
}

// 1️⃣ Attempt to get a random question
$question = fetchUniqueQuestion($letter, $conn);

if ($question) {
    // 2️⃣ Check if the question is already in `used_questions`
    $sql_check = "SELECT * FROM used_questions WHERE letter = ? AND question_text = ? AND answer = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("sss", $question["letter"] , $question["question_text"] , $question["answer"]);
    $stmt_check->execute();
    $result_check = $stmt_check->get_result();

    // 3️⃣ If the question is already used, try to get another question
    while ($result_check->num_rows > 0) {
        // Fetch a new question if the current one is already used
        $question = fetchUniqueQuestion($letter, $conn);
        if (!$question) {
            $response = ["success" => false, "message" => "No available questions for this letter."];
            echo json_encode($response);
            exit;
        }
        // Re-check if the new question is used
        $stmt_check->bind_param("sss", $question["letter"] , $question["question_text"] , $question["answer"]);
        $stmt_check->execute();
        $result_check = $stmt_check->get_result();
    }

    $sql_insert = "INSERT INTO used_questions (letter, question_text, answer) VALUES (?, ?, ?)";
    $stmt_insert = $conn->prepare($sql_insert);
    $stmt_insert->bind_param("sss", $question["letter"], $question["question_text"], $question["answer"]);
    $stmt_insert->execute();
    $stmt_insert->close();

    // Return the question in the response
    $response = ["success" => true, "question" => $question];
} else {
    $response = ["success" => false, "message" => "No question found for this letter"];
}

$stmt_check->close();
$conn->close();

// Return JSON response
echo json_encode($response);
exit;


?>