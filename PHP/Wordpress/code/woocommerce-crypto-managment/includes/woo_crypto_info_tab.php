<?php
/**
 * Created by Amir Khalighi
 * User: amirsnw
 * Date: 02/01/2022
 * Time: 10:00 AM
 * for create gpu important info tab in woocommerce edit page
 */

$display_options = get_option('woo_crypto_manag_display_option');

if($display_options['gpu_info_tab']) {

    /*add new tab in product data tabs in edit product page*/
    add_filter( 'woocommerce_product_data_tabs', 'woo_crypto_info_product_tab', 10, 1);
    /*add custom field in woo gpu tab*/
    add_action( 'woocommerce_product_data_panels', 'woo_crypto_info_product_tab_data' );
   // add_action( 'admin_head', array($this, 'woo_crypto_info_tab_style') );
    /*save accessories data*/
    add_action( 'save_post','save_woo_crypto_info_product_tab_data', 10, 1 );

    add_action( 'admin_head', 'woo_crypto_tab_style' );
} else {
    add_action( 'save_post','save_woo_crypto_info_product_tab_data', 10, 1 );
}

// crypto tab
 function woo_crypto_info_product_tab( $default_tabs ) {
    $default_tabs['woo_gpu_tab'] = array(
        'label'   =>  __( 'اطلاعات پردازنده', 'woo_crypto_manag' ),
        'target'  =>  'woo_crypto_info_product_tab_data',
        'priority' => 70,
        'class'   => array(),
        'icon' => ''
    );
    return $default_tabs;
}

// crypto tab data
 function woo_crypto_info_product_tab_data() { ?>
    <div id="woo_crypto_info_product_tab_data" class="panel woocommerce_options_panel">

    <?php
        global $post, $woocommerce;

        //retrieve the metadata values if they exist
        $gpu_address = get_post_meta( $post->ID,'_gpu_address', true);
        ?>

        <div class="options_group">
            <?php if ( $woocommerce->version >= '3.0' ) : ?>
                <p class="form-field">
                    <label for="_gpu_address"><?php _e( 'آدرس صفحه پردازنده :', 'woo_crypto_manag' ); ?></label>
                    <input type="text" name="_gpu_address" id="_gpu_address" value="<?php echo esc_attr( $gpu_address ); ?>" placeholder="آدرس" />
                    <?php echo wc_help_tip( __( 'لطفا آدرس صفحه اطلاعات پردازنده را وارد نمایید', 'woo_crypto_manag' ) ); ?>
                </p>
            <?php endif; ?>
        </div>
    </div>
    <?php
}

function save_woo_crypto_info_product_tab_data($post_id) {

    global $post, $woocommerce;
    wc_setup_product_data($post);
    $product = wc_get_product( $post_id);
    $calculate_options = get_option('woo_crypto_manag_calculate_options'); //??
    $crypto_profit_percent = $calculate_options['gpu_profit'];
    $crypto_tax_percent = $calculate_options['gpu_tax'];

    if( $product->is_type( 'simple' ) ) {
        update_post_meta($post->ID, '_regular_price', $final_price);
        update_post_meta($post->ID, '_price', $final_price);
    } elseif( $product->is_type( 'variable' ) ) {
        $available_variations = $product->get_available_variations();
        foreach( $available_variations as $key => $value ) {
            $variation_id = absint($value['variation_id']);
            update_post_meta($variation_id, '_gpu_address', strip_tags( get_post_meta($variation_id,'_gpu_address', true )));
        }
    }
}


 function woo_crypto_tab_style() {
    ?>
    <style>
        #woocommerce-product-data ul.wc-tabs li.woo_gpu_tab_options a:before
        {
            font-family: WooCommerce;
            content: '\e006';
        }
    </style>

    <?php
}



// -----------------------------------------
// 1. Add custom field input @ Product Data > Variations > Single Variation

add_action( 'woocommerce_variation_options_pricing', 'woo_gpu_add_custom_field_to_variations', 10, 3 );

function woo_gpu_add_custom_field_to_variations( $loop, $variation_data, $variation ) {

    echo '<div class="variation-gpu-fields" style="border: solid 1px white;">';
    echo '<h4 style="text-align: center; margin-bottom: 0px; margin-top: 88px; color: #663398;">'.'اگر شما در تب اطلاعات گرافیک فیلد های زیر را پر کرده اید و مقدار هر کدام از'.'<br/>'.'فیلد ها که در تمام متغییر ها یکسان است را می توانید خالی بگذارید!'.'</h4>';
    woocommerce_wp_text_input( array(
            'id' => '_gpu_address[' . $loop . ']',
            'class' => 'short',
            'label' => __( 'آدرس پردازنده :', 'woocommerce' ),
            'placeholder' => 'آدرس',
            'desc_tip'    => true,
            'wrapper_class' => 'form-row form-row-first',
            'description' => __( 'آدرس صفحه پردازنده گرافیک را وارد کنید', 'woocommerce' ),
            'value' => get_post_meta( $variation->ID, '_gpu_address', true )
        )
    );
    echo '<div/>';
}

// -----------------------------------------
// 2. Save custom field on product variation save
add_action( 'woocommerce_save_product_variation', 'woo_gpu__save_custom_field_variations', 10, 2 );

function woo_gpu__save_custom_field_variations( $variation_id, $i ) {
    // gold weight
    $gpu_address = $_POST['_gpu_address'][$i];
    update_post_meta( $variation_id, '_gpu_address', esc_attr( $gpu_address ) );
}

// -----------------------------------------
// 3. Store custom field value into variation data

add_filter( 'woocommerce_available_variation', 'woo_gpu_add_custom_field_variation_data' );

function woo_gpu_add_custom_field_variation_data( $variations ) {

    global $post;
    $p_id = $post->ID;

    $g_gpu_address = absint(get_post_meta( $p_id, '_gpu_address',true ));


    if(get_option('woo_crypto_manag_display_option',true))
    {
        $display_opt = get_option('woo_crypto_manag_display_option',true);
    }

    if(!empty(get_post_meta( $variations[ 'variation_id' ], '_gpu_address', true )) && isset($display_opt['display_gpu_address']) && $g_gpu_address==1)
    {
        $variations['variation_gold_weight'] = '<div class="woo_gpu_variation_field"><strong>وزن :</strong><span class="gold-info">' . get_post_meta( $variations[ 'variation_id' ], '_gold_weight', true ) . '</span>گرم</div>';
    }

    if(!empty(get_post_meta( $variations[ 'variation_id' ], '_gold_ojrat_percent', true )) && isset($display_opt['display_wage']) && $g_variation_wage==1)
    {
        $variations['variation_gold_ojrat_percent'] = '<div class="woo_gpu_variation_field"><strong>اجرت محصول :</strong><span class="gold-info">' . get_post_meta( $variations[ 'variation_id' ], '_gold_ojrat_percent', true ) . '</span>درصد</div>';
    }

    if(!empty(get_post_meta( $variations[ 'variation_id' ], '_gold_ojrat_toman', true )) && isset($display_opt['display_wage']) && $g_variation_wage==1)
    {
        $variations['variation_gold_ojrat_toman'] = '<div class="woo_gpu_variation_field"><strong>اجرت محصول :</strong><span class="gold-info">' . number_format(get_post_meta( $variations[ 'variation_id' ], '_gold_ojrat_toman', true )) . '</span>تومان</div>';
    }

    if(!empty(get_post_meta( $variations[ 'variation_id' ], '_gold_stone_cost', true )) && isset($display_opt['display_gold_stone_cost']) && $g_variation_stone==1)
    {
        $variations['variation_gold_stone_cost'] = '<div class="woo_gpu_variation_field"><strong>قیمت سنگ :</strong><span class="gold-info">' . number_format(get_post_meta( $variations[ 'variation_id' ], '_gold_stone_cost', true )) . '</span>تومان</div>';
    }
	
   $variations['variation_gpu_price'] = '<div class="woo_gpu_variation_field variation-price"><strong></strong><span class="gold-info">' . number_format(get_post_meta( $variations[ 'variation_id' ], '_price', true )) . '</span>تومان</div>';


    return $variations;
}


/*change variables range price out put*/
add_filter( 'woocommerce_variable_price_html', 'change_variable_price_html', 10, 2 );
function change_variable_price_html( $price, $product) {
    $prices = [];
    foreach($product->get_children() as $variation_id ){
        if( $rprice = get_post_meta( $variation_id, '_regular_price', true ) )
            $prices[] = $rprice;
    }

    if( sizeof($prices) > 0 ){
        sort($prices);

        $min_price = reset( $prices );
        $max_price = end( $prices );

        if ( $min_price == $max_price ) {
            $price = wc_price($min_price);
        } else {
            $price = wc_price($min_price) . ' - ' . wc_price($max_price);
        }
    }
    return $price;
}

