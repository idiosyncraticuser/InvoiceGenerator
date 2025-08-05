<?php
// Database connection details
$servername = "localhost";
$username = "root";       // Default XAMPP username
$password = "";           // Default XAMPP password
$dbname = "invoice_generator"; // Your database name
$port = 3307;             // Your custom MySQL port

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Check for connection errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
