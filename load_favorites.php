<?php

session_start();

header('Content-Type: application/json');

$conn = mysqli_connect("localhost","root","","homework")or die(mysqli_connect_error());

$username = $_SESSION['username'];

$query="SELECT img, title, vote, movie_id,overview from favorites where username = '".$username."';";
$res = mysqli_query($conn,$query);
$json = array();
if(mysqli_num_rows($res) > 0){
    while($row = mysqli_fetch_assoc($res)){
        array_push($json,$row);
    }
}
else{

    $json = array("status"=>false);
}
mysqli_close($conn);

echo json_encode($json);


?>