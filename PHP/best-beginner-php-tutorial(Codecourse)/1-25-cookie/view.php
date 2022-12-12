<?php
	if (isset($_COOKIE['username'])) {
		echo $_COOKIE['username'];
	} else {
		echo 'The Cookie Not Found!';
	}
?>