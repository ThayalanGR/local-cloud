<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset: UTF-8");
require '../configuration/config.php';


$files = glob('../../storage/*'); // get all file names
foreach($files as $file){ 
  if(is_file($file))
    // echo $file;
    unlink($file);
}
    
$sql = "TRUNCATE tbl_files";
if(mysqli_query($db, $sql)) {
    $jsonData = array(
        "status" => true
    );
    echo json_encode($jsonData);
} else {
    $json = array(mysqli_error());
    echo json_encode($json);
}


?>