<?php
	// #1
	/*$result = '';
	if (isset($_POST['text']) && isset($_POST['search']) && isset($_POST['replace'])) {
		$text = $_POST['text'];
		$search = $_POST['search'];
		$replace = $_POST['replace'];
		
		if (!empty($text) && !empty($search) && !empty($replace)) {
			$result = str_ireplace($search, $replace, $text);
		} else {
			echo 'Please fill in fields.';
		}
	}*/
	
	// #2
	$result = '';
	$offset = 0;
	if (isset($_POST['text']) && isset($_POST['search']) && isset($_POST['replace'])) {
		$text = $_POST['text'];
		$search = $_POST['search'];
		$replace = $_POST['replace'];
		
		$search_length = strlen($search);
		if (!empty($text) && !empty($search) && !empty($replace)) {
			while ($strpos = strpos($text, $search, $offset)) {
				$offset = $strpos + $search_length;
				$text = substr_replace($text, $replace, $strpos, $search_length);
			}
			$result = $text;
		} else {
			echo 'Please fill in fields.';
		}
	}
?>
<form action="1-13-findandreplace.php" method="POST">
	<textarea name="text" rows="7" cols="30"><?php echo $result?></textarea></br></br>
	<br><br>
	Serach For: <br>
	<input type="text" name="search"><br><br>
	Replace: <br>
	<input type="text" name="replace"><br><br>
	
	<input type="submit" value="Find And Replace">
</form>