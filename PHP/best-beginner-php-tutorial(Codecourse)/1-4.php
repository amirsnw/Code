<?php
	$number = 10;
	
	if (1) {
		echo 'TRUE';
	} else {
		echo 'FALSE';
	}
	
	echo "<br>";
	
	if (1 == 1) {
		echo 'TRUE';
	} else {
		echo 'FALSE';
	}
	
	echo "<br>";
	
	$text = 'Somthing';
	if ($text == 'Somthing') {
		echo 'TRUE';
	} else {
		echo 'FALSE';
	}
	
	echo "<br>";
	
	if ($number == 10) {
		echo 'Equal to ten.';
	} else if ($number == 11) {
		echo 'Equal to Eleven';
	} else {
		echo 'Not Equal';
	}
	
	echo "<br>";
	
	if ('1' == 1) {
		echo 'Equal';
	} else {
		echo 'Not Equal';
	}
	
	echo "<br>";
	
	if ('1' === 1) {
		echo 'Equal';
	} else {
		echo 'Not Equal';
	}
	
	$number = 1;
	echo "<br>";
	
	switch ($number) {
		case 1:
			echo 'one';
			break;
		case 2:
			echo 'two';
			break;
		default:
			echo 'Number Not Found';
	}
?>