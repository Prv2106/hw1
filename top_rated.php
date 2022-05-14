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
        <title>Top Movies -Ultime uscite</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="style/top_rated.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap" rel="stylesheet">
        <script src="scripts/top_rated.js" defer="true"></script>
        
    </head>

    <body>
        <article>
            <article id="heading">

                <div data-section="title">
                    <div data-content="image"><img src="images/movie-regular-24.png"/></div>
                    <a href="home.php"><h1>Top Movies</h1></a>
                </div>

                <nav>
                    <div id="links" class="mobile">
                        <a href="home.php">Home</a>
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


            
            <article id="album-background">
                <section data-section="album">    
                    <section id = "album-view"></section>
                    <div><button id="previous-page" class="hidden">pagina precedente</button><button id ="next-page">pagina successiva</button></div>
                </section>
            </article>
            
        </article>
    </body>

</html>