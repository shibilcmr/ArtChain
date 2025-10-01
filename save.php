<?php
$jsonData = json_decode(file_get_contents('php://input'), true);

$filename = 'data.json';

file_put_contents($filename, json_encode($jsonData, JSON_PRETTY_PRINT));

echo "JSON file saved as: " . $filename;
?>