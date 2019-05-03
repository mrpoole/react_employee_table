<?php

require_once('functions.php');
set_exception_handler('handleError');
require_once('mysqlconnect.php');

if(empty($_GET['name'])){
	throw new Exception('You must send an employee name with your request');
}

$name = $_GET['name'];
$position = $_GET['position'];
$office = $_GET['office'];
$extn = (int)$_GET['extn'];
$start = $_GET['start'];
$salary = (int)$_GET['salary'];

$query = "INSERT INTO `employees` (`name`, `position`, `office`, `extn`, `start_date`, `salary`)
VALUES ('$name', '$position', '$office', '$extn', '$start', '$salary')";

$result = mysqli_query($conn, $query);

if(!$result){
	throw new Exception(mysqli_error($conn));
}

$output = [
	'success' => true
];

print(json_encode($output));
?>