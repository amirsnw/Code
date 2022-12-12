<?php
	$user_input = '';
	$user_input_mod = '';
	
	$find = array ('alex','billy', 'dale');
	$replace = array ('a**x','b***y', 'd**e');
	
	if (isset($_POST['user_input']) && !empty($_POST['user_input'])) {
		$user_input = $_POST['user_input'];
		$user_input_mod = str_replace($find, $replace, strtolower($user_input)); // Case Sensitive
		$user_input_mod = str_ireplace($find, $replace, $user_input); // Case Insensitive
	}
?>
<form action="1-12-wordcensoring.php" method="POST">
	<textarea name="user_input" rows="7" cols="30"><?php echo $user_input?></textarea></br></br>
	<input type="submit" value="Submit">
</form>

<hr>

<?php
	echo $user_input_mod;
?>