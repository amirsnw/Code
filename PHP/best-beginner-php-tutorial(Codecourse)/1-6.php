<?php
	$counter = 1;
	while ($counter < 10) {
		echo 'While<br>';
		$counter++;
	}
	
	$counter = 1;
	
	do {
		echo 'Do While<br>';
		$counter++;
	} while ($counter < 10);
	
	for ($counter = 1 ; $counter <= 10 ; $counter++) {
		echo $counter.' for<br>';
	}
?>