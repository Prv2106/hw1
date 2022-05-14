<?php
$url = 'https://api.themoviedb.org/3/movie/popular?api_key=edf334e0279b69e94497f2ed8b1aa58a&language=it&region=IT&page=';

$page = $_GET['page'];
$url = $url . $page;



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