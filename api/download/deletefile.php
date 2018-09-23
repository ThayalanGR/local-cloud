<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset: UTF-8");
require '../configuration/config.php';

if(isset($_POST['fileName'])) {

    if(unlink("../../storage/".$_POST['fileName'])) {
        $sql = "delete from tbl_files where filename = '".$_POST['fileName']."'";
        if(mysqli_query($db, $sql)) {
            $jsonData = array(
                "status" => true
            );
            echo json_encode($jsonData);
        } else {
            $json = array(mysqli_error());
            echo json_encode($json);
        }
    } else {
        $sql = "delete from tbl_files where filename = '".$_POST['fileName']."'";
        if(mysqli_query($db, $sql)) {
            $jsonData = array(
                "status" => true
            );
            echo json_encode($jsonData);
        } else {
            $json = array(mysqli_error());
            echo json_encode($json);
        }
    }
}


?>