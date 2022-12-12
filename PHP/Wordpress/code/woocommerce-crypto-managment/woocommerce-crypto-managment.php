<?php
/*
Plugin Name: محاسبه درامد کریپتو
Description: با این افزونه شما می توانید میزان درامد روزانه حاصل از پردازش هر یک از پردازنده های گرافیکی را محاسبه کنید.
Version: 1.0
Author: Amir Khalighi
Author URI: amirsnw@gmail.com
*/

define( 'WOO_CRYPTO_PLUGIN_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) );

register_activation_hook( __FILE__, 'woo_gpu_managment_install' );

function woo_gpu_managment_install() {
    if ( version_compare( get_bloginfo( 'version' ), '4.2', '<' ) ) {
        deactivate_plugins( basename( __FILE__ ) ); // Deactivate our plugin
    }
}

register_deactivation_hook( __FILE__, 'woo_gpu_managment_deactivation' );

function woo_gpu_managment_deactivation() {
    wp_clear_scheduled_hook( 'gold_update_price_cron_hook' );
}


// add file for plugin admin setting page

require_once (plugin_dir_path(__FILE__).'/includes/woo_crypto_manag_class.php');

 function woo_crypto_managment() {
     $woo_crypto_manag = new woo_crypto_manag_class();
     $woo_crypto_manag->run();
 }

 woo_crypto_managment();
?>
