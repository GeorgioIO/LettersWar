const addOperationBtn = document.querySelector(".operationAdd");

document.body.addEventListener("click" , (event) => {
    if(event.target.classList.contains("addedOPA"))
    {
        event.preventDefault();
    
        let letter = document.getElementById("letter");
        let questionText = document.getElementById("questionText");
        let answer = document.getElementById("questionAnswer");
        if(letter.value === "" || questionText.value === "" || answer.value === "")
        {
            document.querySelector(".operation-screen .operation-title").innerHTML = "Logs : Fields can't be empty";
            setTimeout(() => {
                document.querySelector(".operation-screen .operation-title").innerHTML = "Logs : ";
            }, 1500);
        }
        else
        {
            fetch("../backend/add_question.php", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/x-www-form-urlencoded",
                },
                body : new URLSearchParams({
                    letter : letter.value,
                    text : questionText.value,
                    answer : answer.value,
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.success)
                {
                    document.querySelector(".operation-screen .operation-title").innerHTML = "Logs : Record is added";
                    document.querySelector(".operation-screen .operation-title").style.color = "green";
                }
                else
                {
                    document.querySelector(".operation-screen .operation-title").innerHTML = "Logs : Record is not added";
                    document.querySelector(".operation-screen .operation-title").style.color = "red";
                }
            }).catch(error => {
                console.log("error : " , error);
                document.querySelector(".operation-screen .operation-title").innerHTML = "Logs : " + error;
            })
        }
    }
})


function deleteQuestion(questionID)
{
    fetch("../backend/delete_question.php" , {
        method : "POST",
        headers : {
            "Content_type" : "application/x-www-form-urlencoded",
        },
        body : new URLSearchParams({
            questionID : questionID,
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success)
            {
                console.log("record deleted");
            }
            else
            {
                console.log("Problem deleting record");
            }
    }).catch(error => {
        console.log(error);
    })
}