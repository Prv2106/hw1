<?php
    session_start();
    if(!isset($_SESSION['username'])){
        header("Location: login.php");
        exit;
    }
?>

<?php
    $conn = mysqli_connect("localhost","root","","homework") or die(mysqli_connect_error());

    $username = $_SESSION['username'];
    $query = "SELECT * from users where username = '".$username."'";
    $user_info = mysqli_fetch_assoc(mysqli_query($conn,$query));

?>


<!DOCTYPE html>
<html>
    <head>
        <title>Top Movies -Chat</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="style/chat.css" />
        <link rel="stylesheet" href="style/style.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap" rel="stylesheet">
        <script src="scripts/chat.js" defer="true"></script>
        <script src="scripts/functions.js" defer="true"></script>
    </head>

    <body>
    <article id="heading">

            <div data-section="title">
                <div data-content="image"><img src="images/movie-regular-24.png"/></div>
                <a href="home.php"><h1>Top Movies</h1></a>
            </div>

            <nav>
                    <div id="links" class="mobile">
                    <a href="home.php">Home</a>
                    <a href="genre.php">Genere</a>
                    <a href="top_rated.php">Piu' votati</a>
                    <a href="favorites.php">Preferiti</a>
                    <a href="logout.php">Logout</a>
                    </div> 
            </nav>

            <section data-section="menu-container">
                <div id="menu-view" class="hidden"></div>
                <div id="menu">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </section>

    </article>
        <article id="content">


                <section id="modal-view" class="hidden">
                    <h1></h1>
                    <form id ="text-box">
                        <input type='text' id='input-text' value= "Consiglio a tutti di guardare questo film!!!">
                        <input type='submit' class='submit' value='Cerca'>
                    </form>
                </section>
        
            <header>
                <article>
                    <h1>Cerca film</h1> 
                    <span>Ciao 
                        <?php
                                $query_name = "SELECT name from users where BINARY username = '".$username."' ";
                                $name = mysqli_query($conn,$query_name);
                                if(mysqli_num_rows($name) > 0){
                                    $row = mysqli_fetch_assoc($name);
                                    echo $row['name'];
                            }
                        ?>
                        , consiglia agli altri utenti di Top Movies qualche film da guardare!
                    </span>
                <form class ="search">
                    <input type='text' id='search' value = "nome del film">
                    <input type='submit' class='submit' value='Cerca'>
                    <div id="close" data-content="close" class="hidden"><img  src ="images/x-regular-24.png"/></div>
                </form>

                <article data-section = "movies">
                    <section id = "album-view"></section>
                </article>          
            </header>

        
                

            
            <article id ="main-view">
                <section id="chat-display"></section>
            </article>
            <footer>               
                <em>Powered by Alberto Provenzano</em><br/>
                <em>Matricola: 1000001826</em><br/>
                <em>Anno accademico 2021/2022</em>               
            </footer>                
        </article>
    </body>

</html>
