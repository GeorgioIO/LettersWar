const addQuestionList = document.getElementById("addBtnList");
const updateQuestionList = document.getElementById("updateBtnList");
const deleteQuestionList = document.getElementById("deleteBtnList");
const closeOperationPanel = document.querySelector(".close-operation-panel");
const operationPanel = document.querySelector(".operation-panel")


function containsForm(element){
    return element.querySelector("form") !== null
}


deleteQuestionList.addEventListener("click" , () => {
    operationPanel.classList.remove("hideOperationPanel");
    operationPanel.classList.add("showOperationPanel");
    const operationTitle = document.querySelector(".operation-panel .operation-title");
    operationTitle.innerHTML = "Operation : Delete question";
    
    // Delete from
    if(containsForm(operationPanel))
    {
        operationPanel.querySelector("form").remove();
        const form = document.createElement("form");
        form.classList.add("add-form");
        form.method = "post";
        form.action = "../backend/delete_question.php";
        form.innerHTML = deleteForm;
        operationTitle.after(form);
        document.querySelector("operationDelete").classList.add("addedOPA");
    }
    else
    {
        const form = document.createElement("form");
        form.classList.add("add-form");
        form.method = "post";
        form.action = "../backend/delete_question.php";
        form.innerHTML = deleteForm;
        operationTitle.after(form);
        document.querySelector(".operationDelete").classList.add("addedOPA");
    }
})

updateQuestionList.addEventListener("click" , () => {
    operationPanel.classList.remove("hideOperationPanel");
    operationPanel.classList.add("showOperationPanel");
    const operationTitle = document.querySelector(".operation-panel .operation-title");
    operationTitle.innerHTML = "Operation : Update question";
    
    // Update form
    if(containsForm(operationPanel))
    {
        operationPanel.querySelector("form").remove();
        const form = document.createElement("form");
        form.classList.add("add-form");
        form.method = "post";
        form.action = "../backend/update_question.php";
        form.innerHTML = updateForm;
        operationTitle.after(form);
        document.querySelector(".operationUpdate").classList.add("addedOPA");
    }
    else
    {
        const form = document.createElement("form");
        form.classList.add("add-form");
        form.method = "post";
        form.action = "../backend/update_question.php";
        form.innerHTML = updateForm;
        operationTitle.after(form);
        document.querySelector(".operationUpdate").classList.add("addedOPA");
    }

})

addQuestionList.addEventListener("click" , () => {
    operationPanel.classList.remove("hideOperationPanel");
    operationPanel.classList.add("showOperationPanel");
    const operationTitle =  document.querySelector(".operation-panel .operation-title");
    operationTitle.innerHTML = "Operation : Add question"
    
    // Add form
    if(containsForm(operationPanel))
    {
            operationPanel.querySelector("form").remove();
            const form = document.createElement("form");
            form.classList.add("add-form");
            form.method = "post";
            form.action = "../backend/add_question.php";
            form.innerHTML = addForm;
            operationTitle.after(form);
            document.querySelector(".operationUpdate").classList.add("addedOPA");
    }
    else{
        const form = document.createElement("form");
        form.classList.add("add-form");
        form.method = "post";
        form.action = "../backend/add_question.php";
        form.innerHTML = addForm;
        operationTitle.after(form);
        document.querySelector(".operationAdd").classList.add("addedOPA");
    }

})

closeOperationPanel.addEventListener("click" , () => {
    operationPanel.classList.remove("showOperationPanel");
    operationPanel.classList.add("hideOperationPanel");
})


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
                <input type="text" minlength="0" maxlength="3" required id="recordID" name="recordId">
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

const deleteForm = 
        `
            <div class="recordID">
                <label for="recordId">ID</label>
                <input type="text" minlength="0" maxlength="3" required id="recordID" name="recordId">
            </div>
            <button class="operationDelete">Delete Question</button>
            <button class="operationReset" type="reset">Reset</button>
        `;
