<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Letters War Game</title>
    <link rel="icon" href="../assets/images/Logo.svg" type="image/svg">
    <link rel="stylesheet" href="../frontend/css/game.css">
    <link rel="stylesheet" href="./css/animations.css">
    <script defer type="module" src="../frontend/js/game.js"></script>
</head>
<body>
    <main>
        <ul class="navigation-buttons">
            <li id="HomepageBtn">
                <img src="../assets/images/home-svgrepo-com.svg" alt="go back icon">
            </li>
            <li id="restartGameBtn">
                <img src="../assets/images/retry-svgrepo-com.svg" alt="retry icon">
            </li>
        </ul>
        <div class="messages-screen">
            
        </div>
        <div class="turn">
            <p><span class="activeTeam"></span> turn</p>
        </div>
        <div class="board"></div>
        <div class="screen">
            <div class="information-section"></div>
            <div class="play-section">
                <div id="timer"></div>
                <p id="question">[question here]</p>
                <input type="text" id="answer" name="answer" placeholder="Your answer here...">
                <button class="submitAnswerBtn">Submit</button>
            </div>
        </div>
    </main>
</body>
</html>