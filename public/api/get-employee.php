<?php
require_once('functions.php');
set_exception_handler('handleError');
require_once('mysqlconnect.php');

$id = $_GET['id'];

$query = "SELECT * FROM `employees` WHERE `id` = $id";

$data = mysqli_query($conn, $query);

if(!$data){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_num_rows($data) === 0) {
    throw new Exception('Unable to retrieve employee data');
}

while($row = mysqli_fetch_assoc($data)){
    $output = [
        'id' => (int) $row['id'],
        'name' => $row['name'],
        'position' => $row['position'],
        'office' => $row['office'],
        'extn' => (int) $row['extn'],
        'start_date' => $row['start_date'],
        'salary' => (int) $row['salary']
    ];
}

$output['success'] = true;

print(json_encode($output));

?>