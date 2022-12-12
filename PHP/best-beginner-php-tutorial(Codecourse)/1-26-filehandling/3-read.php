<?php
	$fileName = 'names.txt';
	$handler = fopen($fileName, 'r');
	echo fread($handler, filesize($fileName));
	
	echo '<br>';
	echo '<br>';
	
	$count = 0;
	$readin = file('names.txt');
	$readin_count = count($readin);
	
	echo 'Current names in file: ';
	foreach ($readin as $fname) {
		echo trim($fname);
		if ($count != $readin_count) {
			echo ', ';
		}
		$count++;
	}
?>