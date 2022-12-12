<?php
/**
 * Created by Amir Khalighi
 * User: amirsnw
 * Date: 02/01/2022
 * Time: 10:00 AM
 */

/*show gpus important information before add to cart button in product page*/

add_action('woocommerce_before_add_to_cart_button', 'show_gpu_info_before_add_to_cart');

function show_gpu_info_before_add_to_cart() {
    ?>
    <div class="gpu-important-info">

        <?php
        global $post;

        wc_setup_product_data($post);
        $product = wc_get_product( $post->ID );

        if(get_option('woo_crypto_manag_display_option',true)) {
            $display_opt = get_option('woo_crypto_manag_display_option',true);
        }

        $old_price_18 = 0;
        $old_price_24 = 0;
        if(get_option('ayar_cost_18',true))
        {
            $old_price_18 = get_option('ayar_cost_18',true);
            $old_price_18 = number_format($old_price_18);
        }
        if(get_option('ayar_cost_24',true))
        {
            $old_price_24 = get_option('ayar_cost_24',true);
            $old_price_24 = number_format($old_price_24);
        }
        $gold_weight = get_post_meta( $post->ID,'_gold_weight', true);
        $gold_cutie = get_post_meta( $post->ID, '_gold_cutie',true);
        $gold_ojrat_percent = get_post_meta( $post->ID,'_gold_ojrat_percent', true);
        $gold_ojrat_toman = get_post_meta( $post->ID, '_gold_ojrat_toman',true);
        $gold_stone_cost = number_format(get_post_meta( $post->ID, '_gold_stone_cost',true));
        $gold_variation_weight = get_post_meta( $post->ID, '_gold_variation_weight',true);
        $gold_variation_wage = get_post_meta( $post->ID, '_gold_variation_wage',true);
        $gold_variation_stone = get_post_meta( $post->ID, '_gold_variation_stone',true);

        $gold_perc_wage_meta_key = $display_opt['gpu_meta_perc_wage'];
        $gold_toman_wage_meta_key = $display_opt['gpu_meta_toman_wage'];
        $gold_weight_meta_key = $display_opt['gpu_meta_weight'];
        $gold_cutie_meta_key = $display_opt['gpu_meta_cutie'];
        if(!empty($gold_perc_wage_meta_key))
        {
            $gold_ojrat_percent = get_post_meta( $post->ID,$gold_perc_wage_meta_key, true);
        }
        if(!empty($gold_toman_wage_meta_key))
        {
            $gold_ojrat_toman = get_post_meta( $post->ID, $gold_toman_wage_meta_key,true);
        }
        if(!empty($gold_weight_meta_key))
        {
            $gold_weight = get_post_meta( $post->ID,$gold_weight_meta_key, true);
        }
        if(!empty($gold_cutie_meta_key))
        {
            $gold_cutie = get_post_meta( $post->ID, $gold_cutie_meta_key,true);
        }


        ?>

        <?php if(isset($display_opt['display_gram_weight']) && !empty($gold_weight) && $gold_variation_weight!=1 || isset($display_opt['display_gram_weight']) && $product->is_type( 'simple' )){ ?>
        <p><strong>وزن :</strong><span class="gold-im-info"><span class="gold-info"><?php echo $gold_weight ; ?></span>گرم</span></p>
        <?php } ?>
        <?php if(isset($display_opt['display_gold_cutie'])){ ?>
        <p><strong>نوع و عیار فلز :</strong><span class="gold-im-info"><span class="gold-info"><?php echo $gold_cutie; ?></span>عیار</span></p>
        <?php } ?>
        <?php if(isset($display_opt['display_gram_price'])){ ?>

            <?php if($gold_cutie == 18) { ?>

        <p><strong>قیمت طلای ۱۸ عیار (گرم) :</strong><span class="gold-im-info"><span class="gold-info"><?php echo $old_price_18;  ?></span>تومان</span></p>

                <?php } else{ ?>

                <p><strong>قیمت طلای 24 عیار (گرم) :</strong><span class="gold-im-info"><span class="gold-info"><?php echo $old_price_24;  ?></span>تومان</span></p>

        <?php } }?>

        <?php if(isset($display_opt['display_wage']) && $gold_variation_wage!=1 || isset($display_opt['display_wage']) && $product->is_type( 'simple' )){ ?>

            <?php if($gold_ojrat_percent) { ?>

                <p><strong>اجرت محصول : </strong><span class="gold-im-info"><span class="gold-info"><?php echo $gold_ojrat_percent;  ?></span>درصد</span></p>

            <?php } elseif($gold_ojrat_toman){ ?>

                <p><strong>اجرت محصول :</strong><span class="gold-im-info"><span class="gold-info"><?php echo $gold_ojrat_toman;  ?></span>تومان</span></p>

            <?php } }?>

        <?php if(!empty($gold_stone_cost) && isset($display_opt['display_gold_stone_cost']) && $gold_variation_stone!=1 || !empty($gold_stone_cost) && isset($display_opt['display_gold_stone_cost']) && $product->is_type( 'simple' ) ) { ?>

            <p><strong>قیمت سنگ :</strong><span class="gold-im-info"><span class="gold-info"><?php echo $gold_stone_cost;  ?></span>تومان</span></p>

        <?php } ?>


    </div>
    <?php
}
