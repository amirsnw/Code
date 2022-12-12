<?php
	
	if (isset($_POST['roll'])) {
		$rand = rand(1, 100);
		echo 'You Rolled '.$rand;
	}
	echo '<br>';
	
	$max = getrandmax();
	
	echo $rand.'/'.$max;
?>

<form action="1-15-random.php" method="post">
	<input type="submit" name="roll" value="Roll Dice"></input>
</form>