<?php
	$filename = 'filetodelete.txt';
	if (@unlink('filetodelete.txt')) {
		echo 'File <strong>'.$filename.'</strong> hass been deleted.';
	} else {
		echo 'File cannot be deleted.';
	}
?>