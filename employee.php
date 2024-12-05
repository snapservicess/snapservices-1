<?php
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root";
$password = ""; // Default password for XAMPP
$dbname = "snapservices";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(['message' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $services = $_GET['services'];

    // Fetch employees based on the service
    $sql = "SELECT id, name, email, phone, service FROM employees WHERE service = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $services);
    $stmt->execute();
    $result = $stmt->get_result();

    $employees = [];
    while ($row = $result->fetch_assoc()) {
        $employees[] = $row;
    }

    echo json_encode($employees);

    $stmt->close();
    $conn->close();
}
?>