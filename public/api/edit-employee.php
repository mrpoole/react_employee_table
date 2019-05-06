<?php

require_once('functions.php');
set_exception_handler('handleError');
require_once('mysqlconnect.php');

if(empty($_GET['id'])){
	throw new Exception('You must send an employee id with your request');
}

$id = $_GET['id'];