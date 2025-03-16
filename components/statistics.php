

<div class="total">
    <?php include "../backend/fetch_questions_total.php" ?>
    <p>Total questions : <?= $questionsTotal ?> </p>
</div>
<div class="questions-by-letter">
    <div class="titles">
        <h3>Letters</h3>
        <h3>Total questions by letter</h3>
    </div>
    <ul>
        <?php include "../backend/fetch_questions_count_letter.php" ?>
            <?php foreach($questions_by_letter as $letter): ?>
                <li>
                    <p><?= $letter["letter"] ?> </p> 
                    <p><?= $letter["question_count"]?></p> 
                </li>
            <?php endforeach; ?>
    </ul>
</div>

