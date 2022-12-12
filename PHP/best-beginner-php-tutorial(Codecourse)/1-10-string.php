<?php
	$string = 'This is an example string.';
	$string_word_count = str_word_count($string);
	$string_word_array = str_word_count($string, 1);
	$string_word_array2 = str_word_count($string, 2);
	$string_word_array3 = str_word_count($string, 1, '.');
	$string_word_array4 = str_word_count($string, 1, '&.');
	
	echo $string_word_count;
	echo '<br>';
	print_r ($string_word_array);
	echo '<br>';
	print_r ($string_word_array2);
	echo '<br>';
	print_r ($string_word_array3);
	
	echo '<br>';
	echo '---------------------------------';
	echo '<br>';
	
	$string_shuffled = str_shuffle($string);
	echo $string_shuffled;
	
	$half = substr($string_shuffled, 0, strlen($string));
	echo $half;
	
	echo strrev($string);
	
	echo '<br>';
	
	echo 'String length is: '.strlen($string);
	
	echo '<br>';
	echo '---------------------------------';
	echo '<br>';
	
	$string_one = 'This is my essay.';
	$string_two = 'This is not my essay.';
	
	similar_text($string_one, $string_two, $result);
	
	echo 'The similarity between is, '.$result;
	
	echo '<br>';
	echo '---------------------------------';
	echo '<br>';
	
	$string_trimmed = trim($string);
	$string_trimmed = ltrim($string);
	$string_trimmed = rtrim($string);
	
	echo 'Trim: '.$string_trimmed;
	
	echo '<br>';
	
	$htmlString = 'This is a <img src="image.jpg"> string.';
	$string_slashes = htmlentities(addslashes($htmlString));
	echo $string_slashes;
	echo '<br>';
	echo stripslashes($string_slashes);
	echo '<br>';
	echo '---------------------------------';
	echo '<br>';
	
	if (isset($_GET['user_name']) && !empty($_GET['user_name'])) {
		$user_name = $_GET['user_name'];
		$user_name_lc = strtolower($user_name);
		
		if ($user_name_lc == 'alex') {
			echo 'You are the best';
		}
	}
?>
	
	<form action="1-10-string.php" method="GET">
	Name: <input type="text" name="user_name"></br></br>
	<input type="submit" value="Submit">
	</form>
<?php
	echo '<br>';
	echo '---------------------------------';
	echo '<br>';
	
	$find = 'is';
	$find_length = strlen($find);
	$offset = 0;
	$string = 'This is a string, and it is an example.';
	echo strpos($string, $find);
	echo '<br>';
	
	while ($str_position = strpos($string, $find, $offset)) {
		echo '<strong>'.$find.'</strong> found at '.$str_position.'<br>';
		$offset = $str_position + $find_length;
	}
	
	echo '<br>';
	echo '---------------------------------';
	echo '<br>';
	
	substr("abcdef", -2);    // returns "ef"
	substr("abcdef", -3, 1); // returns "d"
	
	echo substr_replace('This PART should be replace, but this part is ok.', 'alexxxx', 5, 4);
	// returns This alexxxx should be replace, but this part is ok.
	
	echo '<br>';
	
	$letters = array('a', 'p');
	$fruit   = array('apple', 'pear');
	$text    = 'a p';
	$output  = str_replace($letters, $fruit, $text);
	echo $output; // returns apearpearle pear
	
	echo '<br>';
	
	echo str_replace('a', 'apple', 'a p'); // returns apple pack
	
	echo '<br>';
	
	echo str_replace($letters, 'none ', 'a p'); // returns apple pack
?>