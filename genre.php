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
        <title>Top Movies -Generi</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="style/genre.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap" rel="stylesheet">
        <script src="scripts/genre.js" defer="true"></script>
        
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
                        <a href ="top_rated.php">Piu' votati</a>
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


            
            <article id="genre-background">
                <section data-section="genre">
                    <div>
                        <label for = "type">Scegli il genere:</label> 
                        <select name="type" id="type">
                            <option value = 'Azione'>Azione</option>
                            <option value = 'Avventura'>Avventura</option>
                            <option value = 'Animazione'>Animazione</option>
                            <option value = 'Commedia'>Commedia</option>
                            <option value = 'Crime'>Crime</option>
                            <option value = 'Documentario'>Documentario</option>
                            <option value = 'Dramma'>Drammatico</option>
                            <option value = 'Famiglia'>Famiglia</option>
                            <option value = 'Fantasy'>Fantascienza</option>
                            <option value = 'Storia'>Storia</option>
                            <option value = 'Horror'>Horror</option>
                            <option value = 'Musica'>Musica</option>
                            <option value = 'Mistero'>Misterioso</option>
                            <option value = 'Romance'>Romantico</option>
                            <option value = 'Fantascienza'>Fantascienza</option>
                            <option value = 'televisione film'>Film televisivo</option>
                            <option value = 'Thriller'>Thriller</option>
                            <option value = 'Guerra'>Guerra</option>
                            <option value = 'Western'>Western</option>
                        </select>
                        <button id="genre">cerca</button>
                    </div>    
                    <section id = "genre-view"></section>
                    <div><button id="previous-page" class="hidden">pagina precedente</button><button id ="next-page">pagina successiva</button></div>
                </section>
            </article>
            
        </article>
    </body>

</html>