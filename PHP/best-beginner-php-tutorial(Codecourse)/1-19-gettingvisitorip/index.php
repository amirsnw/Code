<?php
	require 'conf.inc.php';
	
	foreach ($ip_blocked as $ip) {
		if ($ip == $ip_address) {
			die('Your IP '.$ip_address.' Has Been Blocked.');
		}
	}
?>

<h1>Welcome!</h1>