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
        <title>Top Movies -Home</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="style/style.css" />
        <link rel="stylesheet" href="style/home.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap" rel="stylesheet">
        <script src="scripts/functions.js" defer="true"></script>
        <script src="scripts/home.js" defer="true"></script>
        
    </head>

    <body>
        <article id="home">
            <article id="heading">

                <div data-section="title">
                    <div data-content="image"><img src="images/movie-regular-24.png"/></div>
                    <h1>Top Movies</h1>
                </div>

                <nav>
                    <div id="links" class="mobile">
                        <a href="genre.php">Genere</a>
                        <a href="top_rated.php">Piu' votati</a>
                        <a href="chat.php">Chat</a>
                        <a href="logout.php">Logout</a>
                    </div> 
                </nav>

                <div data-section="search" class="mobile">
                    <div data-content ="favorites"><a href="favorites.php"><img src ="images/heart-circle-solid-36.png"/></a></div>
                    <form id ="search" class="hidden">
                        <input type='text' id='search-movies' value = "nome del film">
                        <input type='submit' class='submit' value='Cerca'>
                    </form>
                    <div id="search-button" data-content="search"><img  src ="images/search-regular-36.png"/></div>
                    <div id="close" data-content="close" class="hidden"><img  src ="images/x-regular-24.png"/></div>
                </div>

                <section data-section="menu-container">
                    <div id="menu-view" class="hidden"></div>
                    <div id="menu">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </section>

            </article>


            <header>

                <div id="overlay"></div>
                <h1>
                    <div>Ciao
                        <?php
                            $query_name = "SELECT name from users where BINARY username = '".$username."' ";
                            $name = mysqli_query($conn,$query_name);
                            if(mysqli_num_rows($name) > 0){
                                $row = mysqli_fetch_assoc($name);
                                echo $row['name'];
                            }
                        ?>
                    </div> 
                    <strong>Ecco la raccolta dei migliori film di sempre</strong><br/>
                    <em>Trova i tuoi film preferiti!</em><br/>              
                </h1>
            </header>
            <section id="modal-view" class="hidden">
                    <h1></h1>
                    <form id ="text-box">
                        <input type='text' id='input-text' value= "Consiglio a tutti di guardare questo film!!!">
                        <input type='submit' class='submit' value='Cerca'>
                    </form>
            </section>                
            <article data-section="search-mobile">
                <h1>Cerca i tuoi film preferiti</h1>  
                <form class ="search-mobile">
                    <input type='text' id='search-movies-mobile' value = "nome del film">
                    <input type='submit' class='submit' value='Cerca'>
                </form>
            </article>
            <article data-section = "movies">
                <section id = "album-view"></section>
            </article>

            <footer>               
                <em>Powered by Alberto Provenzano</em><br/>
                <em>Matricola: 1000001826</em><br/>
                <em>Anno accademico 2021/2022</em>               
            </footer>
        </article>
    </body>

</html>
