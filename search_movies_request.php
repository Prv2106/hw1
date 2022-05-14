<?php
$url = 'https://api.themoviedb.org/3/search/movie?api_key=edf334e0279b69e94497f2ed8b1aa58a&language=it&region=IT&query=';

$movie = $_GET['query'];
$url = $url . $movie;



$curl = curl_init();
curl_setopt($curl, CURLOPT_URL,$url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$headers = array(
    "Accept: application/json",
);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);


$result = curl_exec($curl);
curl_close($curl);
echo json_encode($result);

?>