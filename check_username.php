<?php

header('Content-Type: application/json');

$conn = mysqli_connect("localhost","root","","homework")or die(mysqli_connect_error());

$username = mysqli_real_escape_string($conn,$_GET['q']);

$query = "SELECT username from users where binary username = '".$username."'";

$res = mysqli_query($conn,$query);

if(mysqli_num_rows($res) > 0){
    $response = array("exists" => true); 
}
else{
    $response = array("exists" => false); 
}
mysqli_close($conn);

echo json_encode($response);

?>