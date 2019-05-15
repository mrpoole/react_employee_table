<?php

require_once('functions.php');
set_exception_handler('handleError');
require_once('mysqlconnect.php');

if(empty($_GET['id'])){
	throw new Exception('You must send an employee id with your request');
}

$id = $_GET['id'];

$query = "DELETE FROM `employees`
    WHERE `id` = $id";

$result = mysqli_query($conn, $query);

if(!$result){
	throw new Exception(mysqli_error($conn));
}

$output = [
	'success' => true
];

print( json_encode($output));
?>