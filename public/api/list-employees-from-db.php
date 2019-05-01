<?php
require_once('functions.php');
set_exception_handler('handleError');
require_once('mysqlconnect.php');

$query = "SELECT * FROM `employees`";

$data = mysqli_query($conn, $query);

if(!$data){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_num_rows($data) === 0) {
    throw new Exception('Unable to retrieve employee data');
}

$output['employee_list'] = [];

while($row = mysqli_fetch_assoc($data)){
    $output['employee_list'][] = [
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