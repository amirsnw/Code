<?php
	if (isset($_GET['day']) && isset($_GET['date']) && isset($_GET['year'])) {
		$day = $_GET['day'];
		$date = $_GET['date'];
		$year = $_GET['year'];
		if (!empty($day) && !empty($date) && !empty($year)) {
			echo 'It is '.$day.' '.$date.' '.$year;
		} else {
			echo 'Fill in all fields.';
		}
	}
?>

<form action="1-22-$_GET.php" method="GET">
	Day:<br><input type="text" name="day"><br>
	Date:<br><input type="text" name="date"><br>
	Year:<br><input type="text" name="year"><br>
	<input type="submit" value="Submit">
</form>