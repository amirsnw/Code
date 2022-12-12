<?php
	$browser = get_browser(null, true);
	$browser = $browser['browser'];
	
	if (strtolower($browser) != 'chrome') {
		echo 'You\'re not using Google Chrome. Please do!';
	} else {
		echo $browser;
	}
?>