const addQuestionList = document.getElementById("addBtnList");
const updateQuestionList = document.getElementById("updateBtnList");
const deleteQuestionList = document.getElementById("deleteBtnList");
const closeOperationPanel = document.querySelector(".close-operation-panel");
const operationPanel = document.querySelector(".operation-panel")



function containsForm(element){
    return element.querySelector("form") !== null
}

function setResetButton()
{
    const operationResetButton = document.querySelector(".operationReset");
    operationResetButton.addEventListener("click" , () => {
        document.querySelector(".operation-form").reset();
    })
}

deleteQuestionList.addEventListener("click" , () => {
   showForm("delete");
})

updateQuestionList.addEventListener("click" , () => {
  showForm("update");
})

addQuestionList.addEventListener("click" , () => {
  showForm("add");
})

closeOperationPanel.addEventListener("click" , () => {
    operationPanel.classList.remove("showOperationPanel");
    operationPanel.classList.add("hideOperationPanel");
})

async function showForm(type , source="bar" , id=0)
{
    if(type === "delete")
    {
        operationPanel.classList.remove("hideOperationPanel");
        operationPanel.classList.add("showOperationPanel");
        const operationTitle = document.querySelector(".operation-panel .operation-title");
        operationTitle.innerHTML = "Operation : Delete question";
        
        // Delete from
        if(containsForm(operationPanel))
        {
            operationPanel.querySelector("form").remove();
            const form = document.createElement("form");
            form.classList.add("operation-form");
            form.method = "post";
            form.action = "../backend/delete_question.php";
            form.innerHTML = deleteForm;
            operationTitle.after(form);
            document.querySelector(".operationDelete").classList.add("addedOPD");
        }
        else
        {
            const form = document.createElement("form");
            form.classList.add("operation-form");
            form.method = "post";
            form.action = "../backend/delete_question.php";
            form.innerHTML = deleteForm;
            operationTitle.after(form);
            document.querySelector(".operationDelete").classList.add("addedOPD");
        }
    
        setResetButton();
    }
    else if(type === "add")
    {
        operationPanel.classList.remove("hideOperationPanel");
        operationPanel.classList.add("showOperationPanel");
        const operationTitle =  document.querySelector(".operation-panel .operation-title");
        operationTitle.innerHTML = "Operation : Add question"
        
        // Add form
        if(containsForm(operationPanel))
        {
                operationPanel.querySelector("form").remove();
                const form = document.createElement("form");
                form.classList.add("operation-form");
                form.method = "post";
                form.action = "../backend/add_question.php";
                form.innerHTML = addForm;
                operationTitle.after(form);
                document.querySelector(".operationAdd").classList.add("addedOPA");
        }
        else{
            const form = document.createElement("form");
            form.classList.add("operation-form");
            form.method = "post";
            form.action = "../backend/add_question.php";
            form.innerHTML = addForm;
            operationTitle.after(form);
            document.querySelector(".operationAdd").classList.add("addedOPA");
        }
    
        setResetButton();
    }
    else if(type === "update")
    {
        operationPanel.classList.remove("hideOperationPanel");
        operationPanel.classList.add("showOperationPanel");
        const operationTitle = document.querySelector(".operation-panel .operation-title");
        operationTitle.innerHTML = "Operation : Update question";
        
        // Update form
        if(containsForm(operationPanel))
        {
            operationPanel.querySelector("form").remove();
            const form = document.createElement("form");
            form.classList.add("operation-form");
            form.method = "post";
            form.action = "../backend/update_question.php";
            form.innerHTML = updateForm;
            operationTitle.after(form);
            document.querySelector(".operationUpdate").classList.add("addedOPU");
        }
        else
        {
            const form = document.createElement("form");
            form.classList.add("operation-form");
            form.method = "post";
            form.action = "../backend/update_question.php";
            form.innerHTML = updateForm;
            operationTitle.after(form);
            document.querySelector(".operationUpdate").classList.add("addedOPU");
        }
        
        if(source === "row")
        {
            let result = await fetchQuestion(id);
            
            if(result != null)
            {
                document.getElementById("recordID").value = result.data.question_id;
                document.getElementById("letter").value = result.data.letter;

                // to remove &quot; and the like...
                const textarea = document.createElement("textarea");
                textarea.innerHTML = result.data.question_text;
                
                document.getElementById("questionText").value = textarea.value
                document.getElementById("questionAnswer").value = result.data.answer; 
            }
        }
        setResetButton();
    }
    else if(type === "view")
    {
        operationPanel.classList.remove("hideOperationPanel");
        operationPanel.classList.add("showOperationPanel");
        const operationTitle = document.querySelector(".operation-panel .operation-title");
        operationTitle.innerHTML = "Operation : View question";
        const operationScreen = document.querySelector(".operation-panel .operation-screen");
        
        if(operationScreen){
            operationScreen.remove();
        }
        
        // Update form
        if(containsForm(operationPanel))
        {
            operationPanel.querySelector("form").remove();
            const form = document.createElement("form");
            form.classList.add("operation-form");
            form.innerHTML = viewForm;
            operationTitle.after(form);
            
        }
        else
        {
            const form = document.createElement("form");
            form.classList.add("operation-form");
            form.innerHTML = viewForm;
            operationTitle.after(form);
        }
        

        let result = await fetchQuestion(id);
        
        if(result != null)
        {
            document.getElementById("recordID").value = result.data.question_id;
            document.getElementById("letter").value = result.data.letter;

            // to remove &quot; and the like...
            const textarea = document.createElement("textarea");
            textarea.innerHTML = result.data.question_text;
            
            document.getElementById("questionText").value = textarea.value
            document.getElementById("questionAnswer").value = result.data.answer; 
        }
    }
}

async function fetchQuestion(id)
{
    try 
    {
        const response = await fetch("../backend/fetch_question.php" , {
            method : "POST",
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams ({questionID : id,})
        })

        const data = await response.json();
        if(data.success)
        {
            return data;
        }
        else
        {
            return null;
        }
    } catch(error) {
        console.error("Error fetching question:", error);
        return null;
    }

}


const addForm = 
        `
            <div class="letter">
                <label for="">Letter</label>
                <input type="text" minlength="0" maxlength="1" required id="letter" name="letter">
            </div>
            <div class="questionText">
                <label for="">Text</label>
                <input type="text" required id="questionText" name="questionText">
            </div>
            <div class="answer">
                <label for="">Answer</label>
                <input type="text" required id="questionAnswer" name="questionAnswer">
            </div>
            <button class="operationAdd">Add Question</button>
            <button class="operationReset" type="reset">Reset</button>
        `;

const updateForm = 
        `
            <div class="recordID">
                <label for="recordId">ID</label>
                <input type="number" min="0" max="999" required id="recordID" name="recordId">
            </div>
            <div class="letter">
                <label for="letter">Letter</label>
                <input type="text" minlength="0" maxlength="1" required id="letter" name="letter">
            </div>
            <div class="questionText">
                <label for="questionText">Text</label>
                <input type="text" required id="questionText" name="questionText">
            </div>
            <div class="answer">
                <label for="questionAnswer">Answer</label>
                <input type="text" required id="questionAnswer" name="questionAnswer">
            </div>
            <button class="operationUpdate">Update Question</button>
            <button class="operationReset" type="reset">Reset</button>
        `;

const viewForm = 
        `
            <div class="recordID">
                <label for="recordId">ID</label>
                <input type="number" min="0" max="999" required id="recordID" name="recordId" readonly>
            </div>
            <div class="letter">
                <label for="letter">Letter</label>
                <input type="text" minlength="0" maxlength="1" required id="letter" name="letter" readonly>
            </div>
            <div class="questionText">
                <label for="questionText">Text</label>
                <textarea required id="questionText" name="questionText" rows="4" cols="50" readonly></textarea>
            </div>
            <div class="answer">
                <label for="questionAnswer">Answer</label>
                <input type="text" required id="questionAnswer" name="questionAnswer" readonly>
            </div>
        `;

const deleteForm = 
        `
            <div class="recordID">
                <label for="recordId">ID</label>
                <input type="number" min="0" max="999" required id="recordID" name="recordId">
            </div>
            <button class="operationDelete">Delete Question</button>
            <button class="operationReset" type="reset">Reset</button>
        `;
