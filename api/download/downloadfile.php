<?php




header("Access-Control-Allow-Origin: *");
header("Content-Type: application/download");
// header('Content-Type: text/event-stream');

header ( 'Content-Type: application/octet-stream' );
header ( 'content-Transfer-Encoding: ASCII' );
// recommended to prevent caching of event data.
header('Cache-Control: no-cache'); 
// header("Content-Type: application/json; charset: UTF-8");
// header("Content-Disposition: attachment");
// header("Content-Transfer-Encoding: Binary");
ini_set ( 'memory_limit', '256M' );
require '../configuration/config.php';

if(isset($_POST['fileName'])) {

    // echo "asasas";


    $filename = trim($_POST['fileName']);
    $filePath = "../../storage/".$filename;

    // echo $_POST['fileName'];

    $filesize = filesize($filePath);

    // header("Content-Transfer-Encoding: Binary");
    header("Content-Length:". $filesize);
    header("Content-Disposition: attachment");

    $handle = fopen($filePath, "rb");

    if (FALSE === $handle) {
        echo "Failed to open stream to URL";
    }

    while (!feof($handle)) {
        echo fread($handle, 1024*1024*10);
        // flush();
        // sleep(3);
    }

    fclose($handle);
}




?>

