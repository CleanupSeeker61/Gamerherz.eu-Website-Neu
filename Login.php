<!doctype html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/pages/register.css">
</head>
<body>
<?php
    if(isset($_POST["submit"])){
      require("mysql.php");
      $stmt = $mysql->prepare("SELECT * FROM accounts WHERE USERNAME = :user"); //Username überprüfen
      $stmt->bindParam(":user", $_POST["username"]);
      $stmt->execute();
      $count = $stmt->rowCount();
      if($count == 0){
        //Username ist frei
        $stmt = $mysql->prepare("SELECT * FROM accounts WHERE EMAIL = :email"); //Username überprüfen
        $stmt->bindParam(":email", $_POST["email"]);
        $stmt->execute();
        $count = $stmt->rowCount();
        if($count == 0){
            //User anlegen
            $stmt = $mysql->prepare("INSERT INTO accounts (USERNAME, PASSWORD, EMAIL, TOKEN) VALUES (:user, :pw, :email, null)");
            $stmt->bindParam(":user", $_POST["username"]);
            $hash = password_hash($_POST["pw"], PASSWORD_BCRYPT);
            $stmt->bindParam(":pw", $hash);
            $stmt->bindParam(":email", $_POST["email"]);
            $stmt->execute();
            echo "Dein Account wurde angelegt";
          } else {
            echo "Die Passwörter stimmen nicht überein";
          }
        } else {
          echo "Email bereits vergeben";
        }
      } else {
        echo ""; //Der Username ist bereits vergeben noch fixen
      }
     ?>

    <?php
    if(isset($_POST["2"])){
        require("mysql.php");
        $stmt = $mysql->prepare("SELECT * FROM accounts WHERE USERNAME = :user"); // Usename Überprüffen
        $stmt->bindParam(":user", $_POST["username"]);
        $stmt->execute();
        $count = $stmt->rowCount();
        if($count == 1){
            //Username ist Frei
            $row = $stmt->fetch();
            if(password_verify($_POST["pw"], $row["PASSWORD"])){
              session_start();
              $_SESSION["username"] = $row["USERNAME"];
              header("Location: geheim.php");
            } else {
              echo "Der Login ist fehlgeschlagen";    
            }
        } else {
          echo "Der Login ist fehlgeschlagen";
        }
      }
       ?>
    
      <header>
        <h2 class="logo">Gamerherz.eu</h2>
        <nav class="navigation">
            <a href="index.php" class="link active">Home</a>
            <a href="news.html" class="link">News</a>
            <a href="rules.html" class="link">Regeln</a>
            <a href="admin-team.html" class="link">Team</a>
            <a href="shop.html" class="link">Shop</a>
            <a href="contact.html" class="link">Kontakiere uns</a>
            <a href="history.html" class="link">History</a>
            <button class="btnLogin-popup">Login</button>
            </nav>
            </header>
    
        <div class="wrapper active-popup">
            <span class="icon-close"><ion-icon name="close"></ion-icon>
            </span>
            <div class="form-box login">
              <h2>Login</h2> 
              <form action="index.php" method="post">
                <div class="input-box">
                    <span class="icon"><ion-icon name="person"></ion-icon></span>
                    <input type="text" name="username" required>
                    <label>Username</label>
                </div>
                <div class="input-box">
                    <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                    <input type="password" name="pw" required>
                    <label>Passwort</label>
                    </div>
                    <div class="remember-forgot">
                        <label><input type="checkbox">
                     Hir Mit Akzeptieren sie unsere</label>
                     <a href="passwordreset.php">Passwort Vergessen?</a>
                    </div>
                    <button type="Senden" name="2" class="btn">Login</button>
                    <div class="login-register">
                        <p>Sie haben noch kein Konto?<a href="#" class="register-link"> Register</a></p>
                    </div>
              </form> 
            </div>
                <div class="form-box register">
                  <h2>Registeration</h2> 
                  <form action="index.php" method="post">
                    <div class="input-box">
                        <span class="icon"><ion-icon name="person"></ion-icon></span>
                        <input type="text" name="username" required>
                        <label>Username</label>
                    </div>
                    <div class="input-box">
                        <span class="icon"><ion-icon name="mail"></ion-icon></span>
                        <input type="email" name="email" required>
                        <label>Email</label>
                    </div>
                    <div class="input-box">
                        <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                        <input type="password" name="pw" required>
                        <label>Passwort</label>
                        </div>
                        <div class="remember-forgot">
                            <label><input type="checkbox">
                                Stimmen Sie den Allgemeinen Geschäftsbedingungen zu</label>
                         <a href="passwordreset.php">Passwort Vergessen?</a>
                        </div>
                        <button type="Senden" name="submit" class="btn">Register</button>
                        <div class="login-register">
                            <p>Haben Sie bereits ein Konto?<a href="#" class="login-link"> Login</a></p>
                        </div>
                  </form> 
                </div>
        </div>
    </section>
</body>
<body>
</body>
<script src="js/login.js"></script>
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.
</html>