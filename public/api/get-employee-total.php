<?php
require_once('functions.php');
set_exception_handler('handleError');
require_once('mysqlconnect.php');

$query = "SELECT COUNT(*) FROM `employees`";

$data = mysqli_query($conn, $query);

if(!$data){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_num_rows($data) === 0) {
    throw new Exception('Unable to retrieve employee data');
}


$output = mysqli_fetch_assoc($data);

print(json_encode($output));

?>