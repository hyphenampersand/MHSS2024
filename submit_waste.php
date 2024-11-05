<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $class_name = $_POST['class'];
    $student_name = $_POST['name'];
    $waste_type = $_POST['wasteType'];
    $amount = $_POST['amount'];
    $waste_score = $_POST['wasteScore'];
    $date = $_POST['date'];

    $sql = "INSERT INTO waste_records (class_name, student_name, waste_type, amount, waste_score, date) 
            VALUES ('$class_name', '$student_name', '$waste_type', $amount, $waste_score, '$date')";

    if ($conn->query($sql) === TRUE) {
        echo "Waste entry submitted!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
