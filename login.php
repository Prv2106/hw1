<?php

session_start();
if(isset($_SESSION['username'])){
    header("Location: home.php");
    exit;
}

if((isset($_POST["username"]))&&(isset($_POST["password"]))){

    $conn = mysqli_connect("localhost","root","","homework") or die(mysqli_connect_error());

    $username = mysqli_real_escape_string($conn, $_POST["username"]);
    $password = mysqli_real_escape_string($conn, $_POST["password"]);

    // permette l'accesso tramite email o username in modo intercambiabile
 //   $user_or_email = filter_var($username, FILTER_VALIDATE_EMAIL) ? "email" : "username";

  //  $query = "SELECT * from users where BINARY $user_or_email = '".$username."'";


    $query = "SELECT * from users where BINARY username = '".$username."'";
    $res = mysqli_query($conn,$query);
    if(mysqli_num_rows($res) > 0){

        $row = mysqli_fetch_assoc($res);

        if(password_verify($_POST['password'],$row['pwd'])){
            $_SESSION["username"] = $_POST["username"];
            header("Location: home.php");
            mysqli_free_result($conn);
            mysqli_close($conn);
            exit;
        }
        else{
            $error = true;
        }
    }    
}

?>

<html>
    <head>
        <title>Top Movies -Login</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="style/login-signup-style.css"/>
        <script src="scripts/login.js" defer="true"></script>
    </head>
    <body>
        <article id="heading">
                    <div data-section="title">
                        <div data-content="image"><img src="images/movie-regular-24.png"/></div>
                        <h1>Top Movies</h1>
                    </div>
        </article>
        <article id="main-view">
            <section>
                <div>Inserisci le tue credenziali per accedere</div>
                <main>
                    <form name = "login"  method= "post">
                        <span><label>Nome utente</label><input type='text' name='username'><div id="username-error"></div></span>
                        <span><label>Password</label><input type='password' name='password'><div id="pwd-error"></div></span>
                        <div id="empty-input" class="hidden"><p class="error">Non hai inserito tutti i campi</p></div>
                        <?php

                            if(isset($error)){
                                echo "<p class = 'error' >";
                                echo "Credenziali Errate";
                                echo "</p>";
                            }
                        ?>
                        <p>Non hai un account? <a id="reg" href="signup.php">Registrati</a></p>
                        <label>&nbsp;<input type='submit' id="submit" value="Accedi"></label>
                    </form>
                </main>
        </section>

        </article>
        
    </body>
</html>    