<?php
/**
 * Created by Amir Khalighi
 * User: amirsnw
 * Date: 02/01/2022
 * Time: 10:00 AM
 */

/*create custom action hook for excute update price cron job*/
add_action('gold_update_price_cron_hook', 'gold_update_price');

function convert2english($string) {
    $newNumbers = range(0, 9);
    // 1. Persian HTML decimal
    $persianDecimal = array('&#1776;', '&#1777;', '&#1778;', '&#1779;', '&#1780;', '&#1781;', '&#1782;', '&#1783;', '&#1784;', '&#1785;');
    // 2. Arabic HTML decimal
    $arabicDecimal = array('&#1632;', '&#1633;', '&#1634;', '&#1635;', '&#1636;', '&#1637;', '&#1638;', '&#1639;', '&#1640;', '&#1641;');
    // 3. Arabic Numeric
    $arabic = array('٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩');
    // 4. Persian Numeric
    $persian = array('۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹');

    $string =  str_replace($persianDecimal, $newNumbers, $string);
    $string =  str_replace($arabicDecimal, $newNumbers, $string);
    $string =  str_replace($arabic, $newNumbers, $string);
    return str_replace($persian, $newNumbers, $string);
}

function gold_update_price() {

    /*api method for get live gold price*/

    $args = array(
        'category' => array( 'gpu' ),
        'orderby'  => 'name',
    );
    $products = wc_get_products( $args );

    foreach($products as $product ) {

    $gpu_address = get_post_meta( $product->ID,'_gpu_address', true);

	$stream_opts = [
        "ssl" => [
            "verify_peer"=>false,
            "verify_peer_name"=>false,
        ],
        "http" => [
            "header"=>"User-Agent:MyAgent/1.0\r\n",
        ],
        "https" => [
            "header"=>"User-Agent:MyAgent/1.0\r\n",
        ]
    ];

    $opts = array('https' => array(
            'method' => "GET",
            'header' => "User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:24.0) Gecko/20100101 Firefox/24.0\r\n"
                . "Accept:text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\n"
                . "Accept-Encoding:gzip, deflate\r\n"
                . "Accept-Language:cs,en-us;q=0.7,en;q=0.3\r\n"
                . "Connection:keep-alive\r\n"
                . "Host:mattia-gold.com\r\n"
        ));

        /*mattia-gold.com*/
        $context = stream_context_create($opts);
        
       /* $gold_price_18_html_content = file_get_html($gpu_address,
               false, stream_context_create($stream_opts));*/

    $gpu_html_content = file_get_html($gpu_address, false, $context);
    $gpu_html = new simple_html_dom();
    $gpu_html->load($gpu_html_content);

    $step = 0;

    foreach($gpu_html->find('table tr') as $elemen) {
        if($step > 0) {
             if($elemen->find('th', 0)) {
                     $gpu_title = $elemen->find('th', 0)->plaintext;
                     if($gpu_title == 'طلای 18 عیار')
                     {
                         $gold_price_18 = $elemen->find('td', 0)->plaintext;
                         $gold_price_18 = str_replace(',', '',$gold_price_18);
                         $gold_price_18 = str_replace(' ', '',$gold_price_18);
                         $gold_price_18 = absint(convert2english($gold_price_18));
                         $new_price_18 = $gold_price_18/10;
                         //echo $gold_price_18.'<br/>';
                     }
                     if($gold_type_title == 'طلای 24 عیار')
                     {
                         $gold_price_24 = $elemen->find('td', 0)->plaintext;
                         $gold_price_24 = str_replace(',', '',$gold_price_24);
                         $gold_price_24 = str_replace(' ', '',$gold_price_24);
                         $gold_price_24 = absint(convert2english($gold_price_24));
                         $new_price_24 = $gold_price_24/10;
                        // echo $gold_price_24.'<br/>';
                         break;
                     }
                 }
        }
        $step++;
    }

    $old_price_18 = 0;
    $old_price_24 = 0;
    if(get_option('ayar_cost_18',true))
    {
        $old_price_18 = get_option('ayar_cost_18',true);
    }
    if(get_option('ayar_cost_24',true))
    {
        $old_price_24 = get_option('ayar_cost_24',true);
    }
    
    if($new_price_18 > 10)
    {
       update_option('ayar_cost_18', $new_price_18); 
    }
    else
    {
       $new_price_18 = $old_price_18; 
    }
    
    if($new_price_24 > 10)
    {
       update_option('ayar_cost_24', $new_price_24); 
    }
    else
    {
       $new_price_24 = $old_price_24; 
    }

    /*first update price option cutie of gold*/
    

    //$old_price_18 != $new_price_18 || $old_price_24 != $new_price_24

    if( 1==1 ) {
        /*create loop for product price update*/
        $options_calculate = get_option('woo_crypto_manag_calculate_options');
        $gpu_tax = $options_calculate['gpu_tax'];
        $gpu_profit = $options_calculate['gpu_profit'];

        $options_cat = $options_calculate['gpu_calculate_product_cat'];
        $schedule_product_cat=implode(',',$options_cat);

        if($schedule_product_cat == 'all')
        {
            $args = array( 'post_type' => 'product', 'posts_per_page'=>-1);
        }
        else
        {
            $args = array( 'post_type' => 'product', 'posts_per_page'=>-1,'product_cat'=>$schedule_product_cat);
        }

        $loop = new WP_Query( $args );
        while ( $loop->have_posts() ) : $loop->the_post();
            global $post,$woocommerec;
            wc_setup_product_data($post);
            $product = wc_get_product( $post->ID );

            if(!empty(get_post_meta( $post->ID,'_gold_weight', true)) && $product->is_type( 'simple' ))
            {
                //retrieve the metadata values if they exist
                $gold_weight = get_post_meta( $post->ID,'_gold_weight', true);
                $gold_cutie = get_post_meta( $post->ID, '_gold_cutie',true);
                $gold_ojrat_percent = get_post_meta( $post->ID,'_gold_ojrat_percent', true);
                $gold_ojrat_toman = get_post_meta( $post->ID, '_gold_ojrat_toman',true);
                if(!empty(absint(strip_tags( get_post_meta( $post->ID, '_gold_stone_cost',true) ))))
                {
                    $gold_stone_cost = absint(strip_tags( get_post_meta( $post->ID, '_gold_stone_cost',true) ));
                }
                else
                {
                    $gold_stone_cost = 0;
                }

                $ayar_cost = 0;
                if($gold_cutie == 18)
                {
                    $ayar_cost = $new_price_18 ;
                }
                else
                {
                    $ayar_cost = $new_price_24 ;
                }

                $ojrat_cost = 0;

                if(!empty(get_post_meta($post->ID,'_gold_ojrat_percent',true)))
                {
                    $gold_ojrat_percent = absint($gold_ojrat_percent);
                    $ojrat_cost = absint(($ayar_cost * $gold_ojrat_percent )/100);
                }
                else
                {
                    $ojrat_cost =  absint($gold_ojrat_toman);
                }
                $profit = absint((($ayar_cost + $ojrat_cost)*$gpu_profit)/100);
                $tax = absint((($ayar_cost + $ojrat_cost + $profit)*$gpu_tax)/100);
                $final_price = absint(($ayar_cost + $ojrat_cost + $profit + $tax) * $gold_weight);
                $final_price = ceil($final_price / 1000) * 1000 ;
                $final_price = $final_price + $gold_stone_cost;
                update_post_meta($post->ID, '_regular_price', $final_price);
                update_post_meta($post->ID, '_price', $final_price);


                /*elseif( $product->is_type( 'variable' ) ){

                    $available_variations = $product->get_available_variations();
                    foreach( $available_variations as $key => $value ){
                        $variation_id = absint($value['variation_id']);
                        update_post_meta($variation_id, '_regular_price', $final_price);
                        update_post_meta($variation_id, '_price', $final_price);
                    }

                }*/
            }

            if ( $product->is_type( 'variable' ) && (!empty(get_post_meta( $post->ID,'_gold_weight', true)) || !empty(absint(strip_tags(get_post_meta( $post->ID, '_gold_variation_weight',true ))))) )
            {
                //retrieve the metadata values if they exist
                $gold_weight_variable = get_post_meta( $post->ID,'_gold_weight', true);
                $gold_cutie = get_post_meta( $post->ID, '_gold_cutie',true);
                $gold_ojrat_percent_variable = get_post_meta( $post->ID,'_gold_ojrat_percent', true);
                $gold_ojrat_toman_variable = get_post_meta( $post->ID, '_gold_ojrat_toman',true);
                $gold_variation_weight = absint(strip_tags(get_post_meta( $post->ID, '_gold_variation_weight',true )));
                $gold_variation_wage = absint(strip_tags(get_post_meta( $post->ID, '_gold_variation_wage',true )));
                $gold_variation_stone = absint(strip_tags(get_post_meta( $post->ID, '_gold_variation_stone',true )));
                if(!empty(absint(strip_tags( get_post_meta( $post->ID, '_gold_stone_cost',true) ))))
                {
                    $gold_stone_cost_variable = absint(strip_tags( get_post_meta( $post->ID, '_gold_stone_cost',true) ));
                }
                else
                {
                    $gold_stone_cost_variable = 0;
                }

                $ayar_cost = 0;
                if($gold_cutie == 18)
                {
                    $ayar_cost = $new_price_18 ;
                }
                else
                {
                    $ayar_cost = $new_price_24 ;
                }

                $available_variations = $product->get_available_variations();
                foreach( $available_variations as $key => $value ){

                    $variation_id = absint($value['variation_id']);

                    $ojrat_cost = 0;

                    if(!empty(absint(strip_tags( $gold_ojrat_percent_variable ))) && $gold_variation_wage !=1 || !empty($gold_ojrat_toman_variable) && $gold_variation_wage !=1 )
                    {
                        if(!empty($gold_ojrat_percent_variable))
                        {
                            $ojrat_cost = absint(($ayar_cost * $gold_ojrat_percent_variable )/100);

                        }
                        else
                        {
                            $ojrat_cost =  absint($gold_ojrat_toman_variable);
                        }
                    }

                    elseif(!empty(absint(strip_tags( get_post_meta($variation_id,'_gold_ojrat_percent',true ) ))) && $gold_variation_wage ==1 || !empty(absint(strip_tags( get_post_meta($variation_id,'_gold_ojrat_toman',true ) ))) && $gold_variation_wage ==1)
                    {
                        if(!empty(absint(strip_tags( get_post_meta($variation_id,'_gold_ojrat_percent',true ) ))))
                        {
                            $gold_ojrat_percent_variation = absint(strip_tags(get_post_meta($variation_id,'_gold_ojrat_percent',true )));
                            $ojrat_cost = absint(($ayar_cost * $gold_ojrat_percent_variation )/100);

                        }
                        else
                        {
                            $ojrat_cost =  absint(strip_tags( get_post_meta($variation_id,'_gold_ojrat_toman',true ) ));
                        }
                    }

                    $profit = absint((($ayar_cost + $ojrat_cost)*$gpu_profit)/100);
                    $tax = absint((($ayar_cost + $ojrat_cost + $profit)*$gpu_tax)/100);

                    if(!empty($gold_weight_variable) && $gold_variation_weight !=1)
                    {
                        $final_price = absint(($ayar_cost + $ojrat_cost + $profit + $tax) * $gold_weight_variable);
                    }

                    elseif(!empty(strip_tags( get_post_meta($variation_id,'_gold_weight',true ) )) && $gold_variation_weight ==1)
                    {
                        $gold_weight_variation = strip_tags( get_post_meta($variation_id,'_gold_weight',true ) );
                        $final_price = absint(($ayar_cost + $ojrat_cost + $profit + $tax) * $gold_weight_variation);
                    }

                    $final_price = ceil($final_price / 1000) * 1000 ;

                    if(!empty($gold_stone_cost_variable) && $gold_variation_stone !=1)
                    {
                        $final_price = $final_price + $gold_stone_cost_variable;
                    }
                    elseif(!empty(absint(strip_tags( get_post_meta($variation_id,'_gold_stone_cost',true ) ))) && $gold_variation_stone ==1)
                    {
                        $gold_stone_cost_variation = absint(strip_tags( get_post_meta($variation_id,'_gold_stone_cost',true ) ));
                        $final_price = $final_price + $gold_stone_cost_variation;
                    }

                    update_post_meta($variation_id, '_regular_price', $final_price);
                    update_post_meta($variation_id, '_price', $final_price );
                }



            }

            $display_options = get_option('woo_crypto_manag_display_option', true);
            $gold_weight_meta_key = $display_options['gpu_meta_weight'];
            $gold_cutie_meta_key = $display_options['gpu_meta_cutie'];
            $gold_perc_wage_meta_key = $display_options['gpu_meta_perc_wage'];
            $gold_toman_wage_meta_key = $display_options['gpu_meta_toman_wage'];

            if(!empty(get_post_meta( $post->ID,$gold_weight_meta_key, true)) && !empty($gold_weight_meta_key) && !empty($gold_cutie_meta_key))
            {

                $gold_weight = get_post_meta( $post->ID,$gold_weight_meta_key, true);
                $gold_cutie = get_post_meta( $post->ID, $gold_cutie_meta_key,true);
                $gold_ojrat_percent = get_post_meta( $post->ID,$gold_perc_wage_meta_key, true);
                $gold_ojrat_toman = get_post_meta( $post->ID, $gold_toman_wage_meta_key,true);

                $ayar_cost = 0;
                if($gold_cutie == 18)
                {
                    $ayar_cost = $new_price_18 ;
                }
                else
                {
                    $ayar_cost = $new_price_24 ;
                }

                $ojrat_cost = 0;

                if(!empty(get_post_meta($post->ID,$gold_perc_wage_meta_key,true)))
                {
                    $gold_ojrat_percent = absint($gold_ojrat_percent);
                    $ojrat_cost = absint(($ayar_cost * $gold_ojrat_percent )/100);
                }
                else
                {
                    $ojrat_cost =  absint($gold_ojrat_toman);
                }
                $profit = absint((($ayar_cost + $ojrat_cost)*$gpu_profit)/100);
                $tax = absint((($ayar_cost + $ojrat_cost + $profit)*$gpu_tax)/100);
                $final_price = absint(($ayar_cost + $ojrat_cost + $profit + $tax) * $gold_weight);
                $final_price = ceil($final_price / 1000) * 1000 ;
                if( $product->is_type( 'simple' ) ){

                    update_post_meta($post->ID, '_regular_price', $final_price);
                    update_post_meta($post->ID, '_price', $final_price);

                }

                elseif( $product->is_type( 'variable' ) ){

                    $available_variations = $product->get_available_variations();
                    foreach( $available_variations as $key => $value ){
                        $variation_id = absint($value['variation_id']);
                        update_post_meta($variation_id, '_regular_price', $final_price);
                        update_post_meta($variation_id, '_price', $final_price);
                    }

                }
            }

        endwhile;

        }
    }
}


// define schedule recurrence time

function myprefix_custom_cron_schedule( $schedules ) {
    $schedules['every_three_hours'] = array(
        'interval' => 10800, // Every 3 hours
        'display'  => __( 'Every 3 hours' ),
    );

    $schedules['every_six_hours'] = array(
        'interval' => 21600, // Every 6 hours
        'display'  => __( 'Every 6 hours' ),
    );

    $schedules['every_nine_hours'] = array(
        'interval' => 32400, // Every 9 hours
        'display'  => __( 'Every 9 hours' ),
    );

    $schedules['every_twelve_hours'] = array(
        'interval' => 43200, // Every 12 hours
        'display'  => __( 'Every 12 hours' ),
    );

    return $schedules;
}
add_filter( 'cron_schedules', 'myprefix_custom_cron_schedule' );

// custom function for run gold update cron job
function schedule_cron_gold_update_price() {
    // First, we read the options collection
        $options_schedule = get_option('woo_crypto_manag_calculate_options');
        $options_schedule_time = $options_schedule['gpu_calculate_schedule'];

    //verify event has not been scheduled
    if ( !wp_next_scheduled( 'gold_update_price_cron_hook' ) ) {

        switch ($options_schedule_time)
        {
            case 3:
                wp_schedule_event( time(), 'every_three_hours', 'gold_update_price_cron_hook' );
                break;
            case 6:
                wp_schedule_event( time(), 'every_six_hours', 'gold_update_price_cron_hook' );
                break;
            case 9:
                wp_schedule_event( time(), 'every_nine_hours', 'gold_update_price_cron_hook' );
                break;
            case 12:
                wp_schedule_event( time(), 'every_twelve_hours', 'gold_update_price_cron_hook' );
                break;
            default:
                wp_schedule_event( time(), 'hourly', 'gold_update_price_cron_hook' );
        }

    }
    
    if($options_schedule_time != get_option('schedule_per_hour'))
    {
        //get time of next scheduled run
        $timestamp_ = wp_next_scheduled('gold_update_price_cron_hook');
        //unschedule custom action hook
        wp_unschedule_event( $timestamp_, 'gold_update_price_cron_hook');
        
        switch ($options_schedule_time)
        {
            case 3:
                wp_schedule_event( time(), 'every_three_hours', 'gold_update_price_cron_hook' );
                break;
            case 6:
                wp_schedule_event( time(), 'every_six_hours', 'gold_update_price_cron_hook' );
                break;
            case 9:
                wp_schedule_event( time(), 'every_nine_hours', 'gold_update_price_cron_hook' );
                break;
            case 12:
                wp_schedule_event( time(), 'every_twelve_hours', 'gold_update_price_cron_hook' );
                break;
            default:
                wp_schedule_event( time(), 'hourly', 'gold_update_price_cron_hook' );
        }
        
        update_option('schedule_per_hour', $options_schedule_time);
    }

}

schedule_cron_gold_update_price();




// for first time get gold price

function get_new_price()
{

    $url_gold_price_18 = 'https://www.tgju.org';
    
    $opts = array('https' => array(
            'method' => "GET",
            'header' => "User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:24.0) Gecko/20100101 Firefox/24.0\r\n"
                . "Accept:text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\n"
                . "Accept-Encoding:gzip, deflate\r\n"
                . "Accept-Language:cs,en-us;q=0.7,en;q=0.3\r\n"
                . "Connection:keep-alive\r\n"
                . "Host:mattia-gold.com\r\n"
        ));

        /*mattia-gold.com*/
        $context = stream_context_create($opts);

    $gold_price_18_html_content = file_get_html($url_gold_price_18,false, $context);
    $gold_price_18_html = new simple_html_dom();
    $gold_price_18_html->load($gold_price_18_html_content);

    $step = 0;

    foreach($gold_price_18_html->find('table tr') as $elemen)
    {
        if($step > 0)
        {
            if($elemen->find('th', 0))
                 {
                     $gold_type_title = $elemen->find('th', 0)->plaintext;
                     if($gold_type_title == 'طلای 18 عیار')
                     {
                         $gold_price_18 = $elemen->find('td', 0)->plaintext;
                         $gold_price_18 = str_replace(',', '',$gold_price_18);
                         $gold_price_18 = str_replace(' ', '',$gold_price_18);
                         $gold_price_18 = absint(convert2english($gold_price_18));
                         $new_price_18 = $gold_price_18/10;
                         //echo $gold_price_18.'<br/>';
                     }
                     if($gold_type_title == 'طلای ۲۴ عیار')
                     {
                         $gold_price_24 = $elemen->find('td', 0)->plaintext;
                         $gold_price_24 = str_replace(',', '',$gold_price_24);
                         $gold_price_24 = str_replace(' ', '',$gold_price_24);
                         $gold_price_24 = absint(convert2english($gold_price_24));
                         $new_price_24 = $gold_price_24/10;
                         //echo $gold_price_24.'<br/>';
                         break;
                     }
                 }
        }

        $step++;
    }

    add_option('ayar_cost_18',$new_price_18);
    add_option('ayar_cost_24',$new_price_24);
}

//create the custom hook for cron scheduling
add_action( 'woo_crypto_new_price_single_cron_hook', 'get_new_price' );

function get_woo_crypto_new_price() {

    //verify event has not been scheduled
    if ( !wp_next_scheduled( 'woo_crypto_new_price_single_cron_hook' ) ) {

        //schedule the event to run in one hour
        wp_schedule_single_event( time()+60, 'woo_crypto_new_price_single_cron_hook' );
    }
}

if (ini_get("allow_url_fopen") ==1)
{
    get_woo_crypto_new_price();
}


