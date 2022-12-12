<?php
	$user_ip = $_SERVER['REMOTE_ADDR'];
	
	function echo_ip() {
		// global $user_ip, $test;
		echo 'Your Ip Address Is:'.$user_ip;
	}
	
	echo_ip();
?>