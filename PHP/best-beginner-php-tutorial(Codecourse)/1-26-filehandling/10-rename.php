<?php
	$filename = 'filetorename.txt';
	$rand = rand(10000, 99999);
	
	if (rename($filename, $rand.'.txt')) {
		echo 'File <strong>'.$filename.' has been renamed to'.$rand.'.txt</strong>';
	} else {
		echo 'File cannot be renamed.';
	}
?>