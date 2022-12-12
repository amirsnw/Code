<?php
	$string = 'This is a string.';
	if (preg_match('/is/', $string)) {
		echo 'Match Found';
	} else {
		echo 'No Match Found';
	}
	;
?>