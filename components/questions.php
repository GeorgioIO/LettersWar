<div class="control">
    <ul>
        <li id="addBtnList">Add Question</li>
        <li id="updateBtnList">Update Question</li>
        <li id="deleteBtnList">Delete Question</li>
    </ul>
</div>
<div class="dashboard">
    <div class="dashboard-header">
        <p>#</p>
        <p>Question ID</p>
        <p>Letter</p>
        <p>Text</p>
        <p>Answer</p>
    </div>
    <div class="dashboard-body">
        <?php include "../backend/fetch_questions.php"; $count = 1; ?>
            <?php foreach($questions as $question): ?>
                    <div class="question">
                        <p> <?=$count ?> </p>
                        <p> <?=$question['question_id']?> </p>
                        <p> <?=$question['letter']?> </p>
                        <p> <?=$question['question_text']?> </p>
                        <p> <?=$question['answer']?> </p>
                        <div class="question-buttons">
                            <img src="../assets/images/setting-1-svgrepo-com.svg" alt="record update" onclick="showForm('update' , 'row' , <?=htmlspecialchars($question['question_id'])?>)">
                                
                            <img src="../assets/images/delete-3-svgrepo-com.svg" alt="delete record" onclick="deleteQuestion(<?=htmlspecialchars($question['question_id'])?>)">

                            <img src="../assets/images/view-eye-svgrepo-com.svg" alt="view record" onclick="showForm('view' , 'row' , <?=htmlspecialchars($question['question_id'])?>)">
                        </div>
                    </div>
                <?php $count++ ?>
            <?php endforeach; ?>
    </div>
</div>