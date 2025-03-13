<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LettersWar</title>
    <link rel="stylesheet" href="./css/admin.css">
    <link rel="stylesheet" href="./css/animations.css">
    <link rel="icon" href="../assets/images/Logo.svg" type="image/svg">
    <script defer src="../frontend/js/scripts.js"></script>
    <script defer src="../frontend/js/cruds.js"></script>
</head>
<body>
    <header>
        <h1>LettersWar Admin Panel</h1>
        <img src="../assets/images/Logo.svg" alt="letterswar logo">
    </header>
    <main>
        <nav class="menu">
            <ul>
                <li class="active">
                    Questions
                    <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="35px" height="35px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                        <path d="M256,0C114.609,0,0,114.609,0,256s114.609,256,256,256s256-114.609,256-256S397.391,0,256,0z M256,472c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z"/>
                        <path d="M314.844,341.454C346.75,321.126,368,284.798,368,243.329c0-63.688-50.156-115.328-112-115.328c-61.875,0-112,51.641-112,115.328c0,63.703,50.125,115.344,112,115.344c9.094,0,17.938-1.156,26.406-3.266c10.625,19.656,26.812,33.562,61.203,26.906v-19.547C343.609,362.767,321.562,357.142,314.844,341.454z M314.062,258.579c0,19.266-6.031,36.734-15.828,49.656c-12.312-13.312-31.609-24.266-56.094-22.875v2.344v20.328c0,0,16.609,0.672,27.984,20.516c-4.266,1.281-8.703,1.969-13.281,1.969c-31.594,0-57.188-32.203-57.188-71.938c0-5.094,0-24.609,0-29.703c0-39.734,25.594-71.938,57.188-71.938c31.609,0,57.219,32.203,57.219,71.938C314.062,233.97,314.062,253.485,314.062,258.579z"/>
                    </svg>
                </li>
                <li>
                    Statistics
                    <svg width="35px" height="35px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <line class="a" x1="2" x2="22" y1="20" y2="20"/>
                        <path class="a" d="M5,20V8.2A.2.2,0,0,1,5.2,8H7.8a.2.2,0,0,1,.2.2V20"/>
                        <path class="a" d="M11,20V4.26667C11,4.11939,11.08954,4,11.2,4h2.6c.11046,0,.2.11939.2.26667V20"/>
                        <path class="a" d="M17,20V11.15c0-.08284.08954-.15.2-.15h2.6c.11046,0,.2.06716.2.15V20"/>
                </svg>
                </li>
            </ul>
        </nav>
        <div class="panel">
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
                    <?php
                        include "../backend/fetch_questions.php";
                        $count = 1;
                        foreach($questions as $question)
                        {
                            echo '<div class="question">';
                            echo "<p>{$count}</p>";
                            echo "<p>{$question['question_id']}</p>";
                            echo "<p>{$question['letter']}</p>";
                            echo "<p>{$question['question_text']}</p>";
                            echo "<p>{$question['answer']}</p>";
                            echo '<div class="question-buttons">';
                                echo '<img src="..//assets/images/setting-1-svgrepo-com.svg" alt="record update">';
                                echo "<img src='../assets/images/delete-3-svgrepo-com.svg' alt='delete record' onclick='deleteQuestion({$question["question_id"]})'>";
                                echo '<img src="../assets/images/view-eye-svgrepo-com.svg" alt="view record">';
                            echo '</div>';
                            echo '</div>';
                            $count += 1;
                        }
                        
                    ?>
                </div>
            </div>
        </div>
    </main>
    <div class="operation-panel">
        <img src="../assets/images/close-svgrepo-com.svg" alt="close operation" class="close-operation-panel">
        <div class="operation-title">Operation : Add question</div>

        <div class="operation-screen">
            <div class="operation-title">Logs :</div>
        </div>
    </div>
    <!-- <div class="view-panel">
        s
    </div> -->
</body>
</html>