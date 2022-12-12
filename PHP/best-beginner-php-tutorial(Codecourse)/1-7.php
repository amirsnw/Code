<?php
	// *************************************
	
	 $conn = @new mysqli('localhost', 'roost', '', 'myproject') 
	 or die('Could not connecft to database.');
	 
	 if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	echo "Connected successfully";
	 
?>