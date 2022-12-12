<?php
	$time = time();
	
	// die();
	
	$actual_time = date('H:i:s', $time);
	$actual_date = date('d M Y - H:i:s', $time);
	
	echo 'The current time is '.$actual_time;
	echo '<br>';
	echo 'The current date is '.$actual_date;
	
	echo '<br>';
	
	echo 'The modified date is '.date('d M Y - H:i:s', strtotime('+1 week'));
	echo '<br>';
	echo 'The modified date is '.date('d M Y - H:i:s', strtotime('+1 week 2 hours 30 seconds'));

?>