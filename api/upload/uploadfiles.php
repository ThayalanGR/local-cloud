<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require '../configuration/config.php';


$fileName = $_FILES["file1"]["name"]; // The file name
$fileTmpLoc = $_FILES["file1"]["tmp_name"]; // File in the PHP tmp folder
$fileType = $_FILES["file1"]["type"]; // The type of file it is
$fileSize = $_FILES["file1"]["size"]; // File size in bytes
$fileErrorMsg = $_FILES["file1"]["error"]; // 0 for false... and 1 for true
if (!$fileTmpLoc) { // if file not chosen
    echo "ERROR: Please browse for a file before clicking the upload button.";
    exit();
}


if(move_uploaded_file($fileTmpLoc, "../../storage/$fileName")){
    
    $sql = "INSERT INTO `tbl_files` (`filename`, `filesize`) VALUES ('".$fileName."', ".$fileSize.")";
    mysqli_query($db, $sql);


    echo "$fileName upload is complete";
} else {
    echo "move_uploaded_file function failed";
}





// $json = array();
// $json = array(  
//     "boolean" => true,
//     "array" => [1, 2, 3, 4],
//     "object" => array("string" => "hello",
//                         "number" => 10)
// );
// echo json_encode($json);

?>