<?php
/**
 * Created by Amir Khalighi
 * User: amirsnw
 * Date: 02/01/2022
 * Time: 10:00 AM
 */

add_action('wp_ajax_crypto_manual_update_price', 'crypto_manual_update_price');
add_action('wp_ajax_nopriv_crypto_manual_update_price', 'crypto_manual_update_price');

function crypto_manual_update_price() {
    if( isset($_POST['_gpu_daily_profit']) )
    {
        $gpu_daily_profit = absint($_POST['ayar_cost_18']);

        /*first update profit option for gpu*/
        update_option('gpu_daily_profit', $new_price_18);

        if( 1 == 1 ) {
            /*create loop for product price update*/
            $options_calculate = get_option('woo_crypto_manag_calculate_options');

            $options_cat = $options_calculate['gpu_calculate_product_cat'];
            $schedule_product_cat = implode(',', $options_cat);

            if($schedule_product_cat == 'all') {
                $args = array( 'post_type' => 'product', 'posts_per_page'=>-1);
            } else {
                $args = array( 'post_type' => 'product', 'posts_per_page'=>-1,'product_cat'=>$schedule_product_cat);
            }

            $loop = new WP_Query( $args );
            $product_total_count = $loop->post_count;
            $_SESSION['prgss_status'] = $product_total_count;
            $_SESSION['prgss_step'] = 1;
            $_SESSION['percent'] = 0;
            while ( $loop->have_posts() ) : $loop->the_post();
                global $post,$woocommerec;
                wc_setup_product_data($post);
                $product = wc_get_product( $post->ID );

                if($product->is_type( 'simple' )) {
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
                                             /*$gold_price_18 = $elemen->find('td', 0)->plaintext;
                                             $gold_price_18 = str_replace(',', '',$gold_price_18);
                                             $gold_price_18 = str_replace(' ', '',$gold_price_18);
                                             $gold_price_18 = absint(convert2english($gold_price_18));
                                             $new_price_18 = $gold_price_18/10;*/
                                             //echo $gold_price_18.'<br/>';
                                             update_post_meta($post->ID, '_profit', $final_price);
                                         }

                                     }
                            }
                            $step++;
                        }
                }

                /*if ( $product->is_type( 'variable' ) ) {
                    //retrieve the metadata values if they exist
                    $gold_weight_variable = get_post_meta( $post->ID,'_gold_weight', true);
                    $gold_cutie = get_post_meta( $post->ID, '_gold_cutie',true);
                    $gold_ojrat_percent_variable = get_post_meta( $post->ID,'_gold_ojrat_percent', true);
                    $gold_ojrat_toman_variable = get_post_meta( $post->ID, '_gold_ojrat_toman',true);
                    $gold_variation_weight = absint(strip_tags(get_post_meta( $post->ID, '_gold_variation_weight',true )));
                    $gold_variation_wage = absint(strip_tags(get_post_meta( $post->ID, '_gold_variation_wage',true )));
                    $gold_variation_stone = absint(strip_tags(get_post_meta( $post->ID, '_gold_variation_stone',true )));
                    if(!empty(absint(strip_tags( get_post_meta( $post->ID, '_gold_stone_cost',true) )))) {
                        $gold_stone_cost_variable = absint(strip_tags( get_post_meta( $post->ID, '_gold_stone_cost',true) ));
                    } else {
                        $gold_stone_cost_variable = 0;
                    }

                    $ayar_cost = 0;
                    if($gold_cutie == 18) {
                        $ayar_cost = $new_price_18 ;
                    } else {
                        $ayar_cost = $new_price_24 ;
                    }

                    $available_variations = $product->get_available_variations();
                    foreach( $available_variations as $key => $value ) {

                        $variation_id = absint($value['variation_id']);

                        $ojrat_cost = 0;

                        if(!empty(absint(strip_tags( $gold_ojrat_percent_variable ))) && $gold_variation_wage !=1
                            || !empty($gold_ojrat_toman_variable) && $gold_variation_wage !=1 ) {
                            if(!empty($gold_ojrat_percent_variable)) {
                                $ojrat_cost = absint(($ayar_cost * $gold_ojrat_percent_variable )/100);

                            } else {
                                $ojrat_cost =  absint($gold_ojrat_toman_variable);
                            }
                        }

                        elseif(!empty(absint(strip_tags( get_post_meta($variation_id,'_gold_ojrat_percent',true ) )))
                            && $gold_variation_wage ==1 || !empty(absint(strip_tags( get_post_meta($variation_id,'_gold_ojrat_toman',true ) )))
                            && $gold_variation_wage ==1) {
                            if(!empty(absint(strip_tags( get_post_meta($variation_id,'_gold_ojrat_percent',true ) )))) {
                                $gold_ojrat_percent_variation = absint(strip_tags(get_post_meta($variation_id,'_gold_ojrat_percent',true )));
                                $ojrat_cost = absint(($ayar_cost * $gold_ojrat_percent_variation )/100);

                            } else {
                                $ojrat_cost =  absint(strip_tags( get_post_meta($variation_id,'_gold_ojrat_toman',true ) ));
                            }
                        }

                        $profit = absint((($ayar_cost + $ojrat_cost)*$gpu_profit)/100);
                        $tax = absint((($ayar_cost + $ojrat_cost + $profit)*$gpu_tax)/100);

                        if(!empty($gold_weight_variable) && $gold_variation_weight !=1) {
                            $final_price = absint(($ayar_cost + $ojrat_cost + $profit + $tax) * $gold_weight_variable);
                        }

                        elseif(!empty(strip_tags( get_post_meta($variation_id,'_gold_weight',true ) ))
                            && $gold_variation_weight == 1) {
                            $gold_weight_variation = strip_tags( get_post_meta($variation_id,'_gold_weight',true ) );
                            $final_price = absint(($ayar_cost + $ojrat_cost + $profit + $tax) * $gold_weight_variation);
                        }

                        $final_price = ceil($final_price / 1000) * 1000 ;

                        if(!empty($gold_stone_cost_variable) && $gold_variation_stone !=1) {
                            $final_price = $final_price + $gold_stone_cost_variable;
                        }
                        elseif(!empty(absint(strip_tags( get_post_meta($variation_id,'_gold_stone_cost',true ) )))
                            && $gold_variation_stone ==1) {
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
                    */
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


        $data = array('update_status' => $product_total_count);
        $data = json_encode($data);
        echo ($data);
    }
    die(); // this is required to return a proper result

}
