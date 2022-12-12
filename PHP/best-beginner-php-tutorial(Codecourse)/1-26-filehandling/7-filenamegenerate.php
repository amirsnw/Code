<?php
	$filename_or = 'image.jpg';
	$filename = rand(1000, 9999).md5($filename_or).rand(1000, 9999);
	
	echo $filename;
?>