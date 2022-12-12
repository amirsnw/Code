<?php
	$name = @$_FILES['file']['name'];
	$extension = strtolower(substr($name, strpos($name, '.') + 1));
	$size = @$_FILES['file']['size'];
	$type = @$_FILES['file']['type'];
	$tmp_name = @$_FILES['file']['tmp_name'];
	$max_size = 2097152;
	
	if (isset($name)) {
		if (!empty($name)) {
			if (($extension == 'jpg' || $extension == 'jpeg')
				&& $type == 'image/jpeg' && $size <= $max_size) {
				$location = 'uploads/';
				if (move_uploaded_file($tmp_name, $location.$name)) {
					echo 'File Uploaded';
				} else {
					echo 'There was an error.';
				}
			} else {
				echo 'File must be jpg/jpeg and not more than 2mb.';
			}
		} else {
			echo 'Please Upload A File.';
		}
	}
?>

<form action="11-upload.php" method="POST" enctype="multipart/form-data">
	<input type="file" name="file"><br><br>
	<input type="submit" value="Submit">
</form>