export async function fetchQuestionPerCell(letter)
{
    try
    {
        const response = await fetch("../backend/gameplay/fetch_question_cell.php" , {
            method : "POST",
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded",
            },
            body : new URLSearchParams ({
                letter : letter,
            })
        });

        const data = await response.json();

        if (data.success) {
            return data.question;
        } else {
            throw new Error("No question found");
        }
    } catch (error) {
            console.error("Error:", error);
            return false;
        }
}