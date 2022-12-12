<?php
	$match = 'pass123';
	
	if (isset($_POST['password'])) {
		$password = $_POST['password'];
		if (!empty($password)) {
			if ($password == $match) {
				echo 'This Is Correct!';
			} else {
				echo 'This Is Incorrect!';
			}
		} else {
			echo 'Please Enter Password';
		}
	}
?>

<form action="1-23-$_POST.php" method="POST">
	Password:<br><input type="password" name="password"><br><br>
	<input type="submit" value="Submit">
</form>