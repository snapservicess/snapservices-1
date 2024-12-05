<?php
session_start();
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

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $service = $_POST['service'];
    $experience = $_POST['experience'];

    // Insert data into the database
    $sql = "INSERT INTO employees (name, email, phone, service, experience) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $name, $email, $phone, $service, $experience);

    if ($stmt->execute() === TRUE) {
        echo json_encode(['message' => 'Data saved successfully.']);
    } else {
        echo json_encode(['message' => 'Error: ' . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>