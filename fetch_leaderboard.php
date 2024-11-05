<?php
include 'db_connect.php';

$sql = "SELECT class_name, SUM(waste_score) as total_waste FROM waste_records GROUP BY class_name ORDER BY total_waste ASC";
$result = $conn->query($sql);

$leaderboard_data = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $leaderboard_data[] = $row;
    }
}

echo json_encode($leaderboard_data);

$conn->close();
?>
