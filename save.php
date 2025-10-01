<?php
// Allow CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get data from FormData
    $jsonData = json_decode($_POST['data'] ?? '{}', true);
    $filename = $_POST['filename'] ?? 'data.json';
    
    // Ensure filename has .json extension
    if (!preg_match('/\.json$/i', $filename)) {
        $filename .= '.json';
    }
    
    try {
        // Save JSON file
        $result = file_put_contents($filename, json_encode($jsonData, JSON_PRETTY_PRINT));
        
        if ($result !== false) {
            echo json_encode([
                'success' => true,
                'filename' => $filename,
                'message' => 'File saved successfully'
            ]);
        } else {
            throw new Exception('Could not write file - check permissions');
        }
        
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed. Use POST.'
    ]);
}
?>
