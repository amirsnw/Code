<?php
	if (isset($_SERVER['HTTP_CLIENT_IP']) 
		&& array_key_exists('HTTP_CLIENT_IP', $_SERVER)) {
		$ip_address = $_SERVER['HTTP_CLIENT_IP'];
	} if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) 
		&& array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER)) {
		$ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
	} else {
		$ip_address = $_SERVER['REMOTE_ADDR'];
	}
	
	echo $ip_address;	
?>