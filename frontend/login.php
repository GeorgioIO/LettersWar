<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Letters War Admin Panel || Log in</title>
    <link rel="icon" href="../assets/images/Logo.svg" type="image/svg">
    <link rel="stylesheet" href="./css/animations.css">
    <link rel="stylesheet" href="./css/login.css">
    <script defer src="../frontend/js/login.js"></script>
</head>
<body>  
    <img src="../assets/images/Logo.svg" alt="Letters war logo" class="logo">
    <form action="../backend/user_validation.php" method="post">
        <h1>Log in | Admin panel</h1>
        <div class="row">
            <input type="text" name="name" id="username" required placeholder="Your name..." autocomplete="off">    
        </div>
        <div class="row">
            <input type="password" name="password" id="password" required placeholder="Password...">
        </div>
        <button type="submit" id="submitBtn">Log in</button>
    </form>
    <p class="message"></p>

</body>
</html>