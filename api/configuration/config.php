<?php

$hostName = "localhost";
$dbName = "localcloud";
$serverPassword = "";
$serverUserName = "root";


$db = mysqli_connect($hostName, $serverUserName, $serverPassword, $dbName);

if(mysqli_connect_errno()){
    echo mysqli_connect_error();

} else {
    // echo "dbconnection success";
}


?>