<?php
// 1. Include your existing database configuration
require 'config.php';

// 2. Set the header to indicate the response will be in JSON format
header('Content-Type: application/json');

// 3. Get the data sent from the JavaScript fetch request
$data = json_decode(file_get_contents('php://input'), true);

// 4. Check if data was received
if (!$data) {
    http_response_code(400); // Bad Request
    echo json_encode(['status' => 'error', 'message' => 'No data received.']);
    exit;
}

// 5. Extract data into variables for clarity
$invoice_no = $data['invoiceNo'];
$invoice_date = $data['invoiceDate'];
$client_name = $data['clientName'];
$client_address = $data['clientAdd'];
$items_json = json_encode($data['items']); // Convert the items array to a JSON string for storage
$subtotal = $data['subtotal'];
$discount_total = $data['discountTotal'];
$cgst_total = $data['cgstTotal'];
$sgst_total = $data['sgstTotal'];
$grand_total = $data['grandTotal'];

// 6. Prepare the SQL INSERT statement for your 'inv_gen' table
// Using a prepared statement is crucial for preventing SQL injection
$stmt = $conn->prepare(
    "INSERT INTO inv_gen (invoice_no, invoice_date, client_name, client_address, items, subtotal, discount_total, cgst_total, sgst_total, grand_total) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
);

// 7. Bind the variables to the prepared statement
// The "sssssddddd" tells MySQL the data type for each parameter: s = string, d = double (for numbers with decimals)
$stmt->bind_param(
    "sssssddddd", 
    $invoice_no, 
    $invoice_date, 
    $client_name, 
    $client_address, 
    $items_json, 
    $subtotal, 
    $discount_total, 
    $cgst_total, 
    $sgst_total, 
    $grand_total
);

// 8. Execute the statement and send a response back to the JavaScript
if ($stmt->execute()) {
    // If successful, send a success status
    echo json_encode(['status' => 'success', 'message' => 'Invoice saved successfully!']);
} else {
    // If it fails, send an error status and the database error message
    http_response_code(500); // Internal Server Error
    echo json_encode(['status' => 'error', 'message' => $stmt->error]);
}

// 9. Close the statement and the connection
$stmt->close();
$conn->close();
?>
