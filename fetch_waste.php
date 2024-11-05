<?php
include 'db_connect.php';

$class_name = $_GET['class'];
$sql = "SELECT student_name, waste_type, amount, waste_score, date FROM waste_records WHERE class_name = '$class_name'";
$result = $conn->query($sql);

$waste_data = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $waste_data[] = $row;
    }
}

echo json_encode($waste_data);

$conn->close();
?>

