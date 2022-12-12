<?php
	$fileName = 'names.txt';
	$handler = fopen($fileName, 'r');
	$datain = fread($handler, filesize($fileName));
	
	$names_array = explode(' ', $datain);
	
	foreach ($names_array as $name) {
		echo $name.'<br>';
	}
?>