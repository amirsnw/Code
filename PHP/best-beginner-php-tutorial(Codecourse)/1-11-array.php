<?php
	$food = array('Pasta', 'Pizza', 'Salad');
	
	echo $food;
	
	echo '<br>';
	echo $food[1];
	
	echo '<br>';
	print_r($food);
	
	echo '<br>';
	$food[4] = 'Fruit';
	echo $food[4];
	
	echo '<br>';
	$food_a = array('Pasta' => 300, 'Pizza' => 1000, 'Salad' => 150, 'vegetables' => 50);
	print_r($food_a);
	
	echo '<br>';
	echo $food_a['Pasta'];
	
	/* ****************** */
	
	$food = array('Healthy' => 
				array('Salad', 'Vegerables', 'Pasta'),
				'Unhealthy' =>
				array('Pizza', 'Ice Cream'));
				
	echo '<br>';
	print_r($food);
	echo '<br>';
	echo $food['Healthy'][0];
	
	echo '<br><br>';
	
	foreach($food as $key => $value) {
		echo '<strong>'.$key.'</strong>'.'<br>';
		foreach($value as $item) {
			echo ' '.$item.'<br>';
		}
	}
	
?>