<?php
	function myName() {
		echo 'Amir';
	}
	
	echo 'my name is ';
	myName();
	
	function add($number1, $number2) {
		echo $number1 + $number2;
	}
	
	echo '<br>';
	
	add(42,32);
	
	// ************************************
	
	echo '<br>';
	function displayDate($day, $date, $year) {
		echo $day.' '.$date.' '.$year;
	}
	
	displayDate('Monday', 31, 2011);
	
	// *************************************
	echo '<br>';
	function add2($number1, $number2) {
		return $number1 + $number2;
	}
	
	echo add2(10,10) + 100;
?>