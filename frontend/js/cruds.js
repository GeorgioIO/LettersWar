const addOperationBtn = document.querySelector(".operationAdd");

document.body.addEventListener("click" , (event) => {
    event.preventDefault();
    let clickedElement = event.target;
    if(clickedElement.classList.contains("addedOPA"))
    {
        addQuestion();
    }
    else if(clickedElement.classList.contains("addedOPU"))
    {
        updateQuestion();
    }
    else if(clickedElement.classList.contains("addedOPD"))
    {
        let questionID = document.getElementById("recordID").value;
        deleteQuestion(questionID , "panel");
    }
})


function updateQuestion(){
    let questionID = document.getElementById("recordID");
    let letter = document.getElementById("letter");
    let questionText = document.getElementById("questionText");
    let answer = document.getElementById("questionAnswer"); 
    
    if(letter.value === "" || questionID.value === "" || questionText.value === "" || answer.value === ""){
        showLogsError("Fields can't be empty");
        setTimeout(() => {
            resetLogsScreen();
        }, 1500);
    }
    else{
        fetch("../backend/update_question.php" , {
            method : "POST",
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded",
            },
            body : new URLSearchParams ({
                questionID : questionID.value,
                letter : letter.value,
                questionText : questionText.value,
                answer : answer.value,
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                showLogsSuccess(data.message);
                reloadQuestions();
            }
            else{
                showLogsError(data.message);
            }
        }).catch(error => {
            showLogsError(error);
        })
    }

}

function addQuestion(){
    let letter = document.getElementById("letter");
    let questionText = document.getElementById("questionText");
    let answer = document.getElementById("questionAnswer");
    if(letter.value === "" || questionText.value === "" || answer.value === "")
    {
        showLogsError("Fields can't be empty");
        setTimeout(() => {
            resetLogsScreen();
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
                showLogsSuccess(data.message)
                reloadQuestions();
            }
            else
            {
                showLogsError(data.message);
            }
        }).catch(error => {
            showLogsError(error);
        })
    }
}

function deleteQuestion(questionID , source="record")
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
        if(source === "panel")
        {
            if(data.success)
            {
                showLogsSuccess(data.message);
                reloadQuestions();
            }
            else
            {
                showLogsError(data.message);
            }
        }
        else
        {
            if(data.success)
            {
                toggleOperationMessage(data.message);
                reloadQuestions();
            }
            else
            {
                showLogsError(data.message);
            }
        }
    }).catch(error => {
        showLogsError(data.message);
    })
}

function reloadQuestions()
{
    fetch("../backend/get_questions_ajax.php")
    .then(response => response.json())
    .then(data => {
        if(data.success)
        {
            let dashboardBody = document.querySelector(".dashboard-body");
            dashboardBody.innerHTML = "";
            let count = 1;
            data.questions.forEach(question => {
                const questionElement = document.createElement("div");
                questionElement.classList.add("question");
                questionElement.innerHTML = `
                <p>${count}</p>
                <p>${question.question_id}</p>
                <p>${question.letter}</p>
                <p>${question.question_text}</p>
                <p>${question.answer}</p>
                <div class="question-buttons">
                    <img src="../assets/images/setting-1-svgrepo-com.svg" alt="record update" onclick="showForm('update', 'row', ${question.question_id})">
                    <img src="../assets/images/delete-3-svgrepo-com.svg" alt="delete record" onclick="deleteQuestion(${question.question_id})">
                    <img src="../assets/images/view-eye-svgrepo-com.svg" alt="view record" onclick="showForm('view', 'row', ${question.question_id})">
                </div>
            `;
            dashboardBody.appendChild(questionElement);
            count++;
            });
        }
        else
        {
            console.log("failed to reload questions");
        }
        
    })
    .catch(error => {
        console.log(error);
    });
}

function toggleOperationMessage(text , type)
{
    const operationMessage = document.querySelector(".operation-message");
    operationMessage.innerHTML = text;
    operationMessage.classList.remove("hideOperationMessage");
    operationMessage.classList.add("showOperationMessage");

    if(type === "delete")
    {
        operationMessage.style.backgroundcolor = "red";
    }

    // after how many seconds bar will start appearing
    setTimeout(() => {
        operationMessage.classList.add("bar");
    }, 300)

    // after how many seconds i want the bar to hide
    setTimeout(() => {
        operationMessage.classList.remove("bar");
        operationMessage.classList.add("hideOperationMessage");
    }, 2500)
}

function showLogsError(text)
{
    document.querySelector(".operation-screen .operation-title").innerHTML = "Logs : " + text;
    document.querySelector(".operation-screen .operation-title").style.color = "red";
}

function showLogsSuccess(text)
{
    document.querySelector(".operation-screen .operation-title").innerHTML = "Logs : " + text;
    document.querySelector(".operation-screen .operation-title").style.color = "green";
}

function resetLogsScreen()
{
    document.querySelector(".operation-screen .operation-title").innerHTML = "Logs : ";
    document.querySelector(".operation-screen .operation-title").style.color = "black";
}