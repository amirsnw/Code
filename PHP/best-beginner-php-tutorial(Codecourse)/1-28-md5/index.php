<?php
	
	if (isset($_POST['user_password'])&&!empty($_POST['user_password'])) {
		$pass = md5($_POST['user_password']);
		
		$filename = 'hash.txt';
		$handler = fopen($filename, 'r');
		$file_pass = @fread($handler, filesize($filename));
		
		if ($pass == $file_pass) {
			echo 'Correct';
		} else {
			echo 'Incorrect Password';
		}
	} else {
		echo 'Please Enter A Password';
	}
	
?>

<form action="index.php" method="POST">
	password: <input type="text" name="user_password"><br><br>
	<input type="submit" value="Submit">
</form>