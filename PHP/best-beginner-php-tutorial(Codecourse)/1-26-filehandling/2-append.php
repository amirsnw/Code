<?php
	if (isset($_POST['name'])) {
		$name = $_POST['name'];
		if (!empty($name)) {
			$handler = fopen('names.txt', 'a');
			fwrite($handler, $name."\n");
			fclose($handler);
		} else {
			echo 'Please Enter A Name';
		}
	}
	echo '<br>';
?>
<form action="2-append.php" method="POST">
	Name:<br><input type="name" name="name"><br><br>
	<input type="submit" value="Submit">
</form>