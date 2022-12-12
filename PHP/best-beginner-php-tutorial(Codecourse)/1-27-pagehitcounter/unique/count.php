<?php
	
	function hit_count() {
		
		$ip_address = $_SERVER['REMOTE_ADDR'];
		$counter_file_name = 'count.txt';
		$ip_file_name = 'ips.txt';
		$found = false;
		
		$ip_file = file($ip_file_name);
		foreach($ip_file as $ip) {
			$ip_single = trim($ip);
			if ($ip_single != $ip_address) {
				$found = false;
			} else {
				$found = true;
				break;
			}
		}
		if (!$found) {
			$handle = fopen($counter_file_name, 'r');
			$current = @fread($handle, filesize($counter_file_name));
			fclose($handle);
			
			$current++;
			
			$handle = fopen($counter_file_name, 'w');
			fwrite($handle, $current);
			fclose($handle);
			
			$handle = fopen($ip_file_name, 'a');
			fwrite($handle, $ip_address."\n");
			fclose($handle);
		}
	}
?>