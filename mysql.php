<?php
$host = "45.81.233.60";
$name = "WebSystem-Accounts";
$user = "WebSystem-Accounts";
$passwort = "Qj5HG11buoZzDy6F";
try{
    $mysql = new PDO("mysql:host=$host;dbname=$name", $user, $passwort);
} catch (PDOException $e){
    echo "SQL Error: ".$e->getMessage();
} 
    ?>