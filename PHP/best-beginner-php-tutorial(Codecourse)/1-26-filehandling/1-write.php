<?php
	$handler = fopen('names.txt', 'w');
	
	fwrite($handler, 'Alex'."\n");
	fwrite($handler, 'Billy');
	
	fclose($handler);
	
	echo 'Written';
?>