<?php
    session_start();
    if(!isset($_SESSION['username'])){
        header("Location: login.php");
        exit;
    }
?>



<!DOCTYPE html>
<html>
    <head>
        <title>Top Movies - Preferiti</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="style/style.css" />
        <link rel="stylesheet" href="style/favorites.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap" rel="stylesheet">
        <script src="scripts/functions.js" defer="true"></script>
        <script src="scripts/favorites.js" defer="true"></script>
        
    </head>

    <body>
        
        <section id="modal-view" class="hidden">
                    <h1></h1>
                    <form id ="text-box">
                        <input type='text' id='input-text' value= "Consiglio a tutti di guardare questo film!!!">
                        <input type='submit' class='submit' value='Cerca'>
                    </form>
        </section>
        
        <article id="favorites">
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
                        <a href="chat.php">Chat</a>
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


            
            <article id="favorites-background">
                <section data-section="favorites">
                    <section id = "album-view"></section>
                </section>
            </article>
            <footer>               
                <em>Powered by Alberto Provenzano</em><br/>
                <em>Matricola: 1000001826</em><br/>
                <em>Anno accademico 2021/2022</em>               
            </footer>
        </article>
    </body>

</html>