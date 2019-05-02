<?php

require_once('functions.php');
set_exception_handler('handleError');
require_once('mysqlconnect.php');

$name = $_POST['name'];
$position = $_POST['position'];
$office = $_POST['office'];
$extn = $_POST['extn'];
$start = $_POST['start'];
$salary = $_POST['salary'];

print($name. $position);
exit;

$query = "INSERT INTO `employees`
VALUES ($name, $position, $office, $extn, $start, $salary)";

$result = mysqli_query($conn, $query);

if(!$result){
	throw new Exception(mysqli_error($conn));
}

if( mysqli_num_rows($result) === 0){
	throw new Exception("unable to insert employee");
}

$team_data = mysqli_fetch_assoc($result);

$output = [
	'success' => true
];

print(json_encode($output));
?>