<?php
session_start();

    if(!empty($_POST["name"]) && !empty($_POST["surname"]) && !empty($_POST["email"]) && 
    !empty($_POST["username"]) && !empty($_POST["password"]) && !empty($_POST["confirm_password"])){

        $conn=mysqli_connect("localhost","root","","homework")or die(mysqli_connect_error());
        $error = array();

        $name= mysqli_real_escape_string($conn,$_POST["name"]);
        $surname= mysqli_real_escape_string($conn,$_POST["surname"]);
        $email= mysqli_real_escape_string($conn,$_POST["email"]);
        $username= mysqli_real_escape_string($conn,$_POST["username"]);
        $password= mysqli_real_escape_string($conn,$_POST["password"]);

        if(!preg_match('/^[a-zA-Z ]*$/', $_POST['name'])){ 
            $error[]="Devi inserire un nome reale";
        }

        if(!preg_match('/^[a-zA-Z ]*$/', $_POST['surname'])){ 
            $error[]="Devi inserire un cognome reale";
        }
        

        if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $_POST['username'])){ 
            $error[]="Username non valido";
        }
        else{
            $query="SELECT username FROM users where binary username='".$username."'";
            $res=mysqli_query($conn,$query);
            
            if(mysqli_num_rows($res) > 0){
                $error[]="Username già in uso";
            }
        }
    
        if(strlen($_POST["password"]) < 8){
            $error[]= "La password deve contenere almeno 8 caratteri";
        }

        if(strcmp($_POST['password'],$_POST['confirm_password'])!=0){
            $error[]="Le password non coincidono";
        }

        if(!filter_var($_POST["email"],FILTER_VALIDATE_EMAIL)){
            $error[]="Email non valida";
        }
        else{
            $query="SELECT email FROM users where binary email='".$email."'";
            $res=mysqli_query($conn,$query);
            if(mysqli_num_rows($res) > 0){
                $error[]="Esiste un account associato a questa email";
            }
        }

        if(count($error)==0){
            $password=password_hash($password,PASSWORD_BCRYPT);
            $query="INSERT INTO  users values('".$name."','".$surname."','".$username."','".$email."','".$password."')";
            if(mysqli_query($conn,$query)){
                $_SESSION['username']= $_POST["username"];
                header('Location: home.php');
                mysqli_close($conn);
                exit;
            }
        }
        else {
            print_r($error);
        }  
    }
?>

<html>
    <head>
        <title>Top Movies -Registrazione</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="style/login-signup-style.css"/>
        <script src="scripts/signup.js" defer="true"></script>
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
                <div>Inserisci i tuoi dati:</div>
                <main>
                    <form name= "signup"   method= "post">
                        <span><label>Nome</label><input type='text' name='name'<?php if(isset($_POST["name"])){echo "value=".$_POST["name"];} ?>><div id="name-error"></div></span>
                        <span><label>Cognome</label><input type='text' name='surname'<?php if(isset($_POST["surname"])){echo "value=".$_POST["surname"];} ?>><div id="surname-error"></div></span>
                        <span><label>E-mail</label><input type='text' name='email' <?php if(isset($_POST["email"])){echo "value=".$_POST["email"];} ?>><div id="email-error"></div></span>
                        <span><label>Nome utente</label><input type='text' name='username' <?php if(isset($_POST["username"])){echo "value=".$_POST["username"];} ?>><div id="username-error"></div></span>
                        <span><label>Password</label><input type='password' name='password' <?php if(isset($_POST["password"])){echo "value=".$_POST["password"];} ?>><div id="pwd-error"></div></span>
                        <span><label>Conferma password</label><input type='password' name='confirm_password' <?php if(isset($_POST["confirm_password"])){echo "value=".$_POST["confirm_password"];} ?>><div id="c-pwd-error"></div></span>
                        <span><div id="empty-input" class="hidden"><p class="error">Devi compilare tutti i campi</p></div></span>
                        <span><p>Hai già un account? <a id="reg" href="login.php">Accedi</a></p>

                        <label>&nbsp;<input type='submit' id="submit" value="Registrati"></label>
                    </form>
                </main>
        </section>

        </article>
        
    </body>
</html> 

