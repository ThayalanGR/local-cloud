<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: applicatiopn/json; Charset=UTF-8");
require '../configuration/config.php';


$prepareJsonData = array();


$queryString = "select * from tbl_files order by id desc";

$count = 0;

$row = mysqli_query($db, $queryString);

while($result = mysqli_fetch_array($row)) {
    $prepareJsonData[$count] = array($result);
    $count++;
}

echo json_encode($prepareJsonData);



?>