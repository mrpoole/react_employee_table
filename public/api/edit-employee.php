<?php

require_once('functions.php');
set_exception_handler('handleError');
require_once('mysqlconnect.php');

if(empty($_GET['id'])){
	throw new Exception('You must send an employee id with your request');
}

$id = $_GET['id'];
$name = $_GET['name'];
$position = $_GET['position'];
$office = $_GET['office'];
$extn = (int)$_GET['extn'];
$start = $_GET['start'];
$salary = (int)$_GET['salary'];

$query = "UPDATE `employees`
SET `name`='$name', `position`='$position', `office`='$office', `extn`='$extn', `start_date`='$start', `salary`='$salary'
WHERE `id` = $id";

$result = mysqli_query($conn, $query);

if(!$result){
	throw new Exception(mysqli_error($conn));
}

$output = [
	'success' => true
];

print(json_encode($output));
?>