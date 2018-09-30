<?php



///

//if u want to add more than 20gb you need to pump up the underneath values in php.ini
// memory_limit = 20000M
// upload_max_filesize = 20000M
// post_max_size = 20000M




header("Access-Control-Allow-Origin: *");
header("charset=UTF-8");
require '../configuration/config.php';
ini_set('memory_limit', '2000000M');

$fileName = $_FILES["fileData"]["name"]; // The file name
$fileTmpLoc = $_FILES["fileData"]["tmp_name"]; // File in the PHP tmp folder
$fileType = $_FILES["fileData"]["type"]; // The type of file it is
$fileSize = $_FILES["fileData"]["size"]; // File size in bytes
$fileErrorMsg = $_FILES["fileData"]["error"]; // 0 for false... and 1 for true
if (!$fileTmpLoc) { // if file not chosen
    echo "ERROR: Please browse for a file before clicking the upload button.";
    exit();
}


if(move_uploaded_file($fileTmpLoc, "../../storage/$fileName")){
    
    $sql = "INSERT INTO `tbl_files` (`filename`, `filesize`) VALUES ('".$fileName."', ".$fileSize.")";
    mysqli_query($db, $sql);


    echo "Upload Completed";
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