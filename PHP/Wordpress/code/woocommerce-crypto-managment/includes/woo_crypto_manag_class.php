<?php
/**
 * Created by Amir Khalighi
 * User: amirsnw
 * Date: 02/01/2022
 * Time: 10:00 AM
 */

class woo_crypto_manag_class
{
    //string plugin name
    private $name;

    // hook name for add script only on the plugin settings page
    private $hook_setting_page;

    function __construct() {
        $this->name = 'woo_crypto_manag';
    }

    public function run()
    {
        // add new menue item in wordpress admin for plugin page setting
        add_action('admin_menu' , array($this, 'add_woo_crypto_manag_menu'));
        /**
         * Initializes the theme options page by registering the Sections,
         * Fields, and Settings.
         *
         * This function is registered with the 'admin_init' hook.
         */
        add_action('admin_init', array($this, 'woo_crypto_manag_options'));


        add_filter( 'woocommerce_locate_template', array($this,'redirect_woocommerce_locate_template'), 10, 3 );

        // add custom style in product page

        add_action('template_redirect', array($this, 'woo_crypto_template_style'));
    }


    // function for add plugin menu

    public function add_woo_crypto_manag_menu()
    {
        //create custom top-level menu
       // add_menu_page( 'تنظیمات محاسبات قیمت جواهر', 'جواهر', 'manage_options', __FILE__, array($this,'woo_crypto_manag_settings_page'), plugins_url( '/images/wp-icon.png', __FILE__ ) );
        $this->hook_setting_page = add_submenu_page('woocommerce','تنظیمات محاسبات قیمت جواهر', 'محاسبات جواهر','manage_options','woocommerce-gpu-managment', array($this,'woo_crypto_manag_settings_page'));
        add_action('load-'.$this->hook_setting_page, array($this, 'woo_crypto_manag_admin_script'));
    }

    // add setting page for woocommerce cryptolery managment
    public function woo_crypto_manag_settings_page()
    {
        ?>
        <div class="wrap">

            <?php //screen_icon(); ?>
            <h2><?php _e( 'تنظیمات محاسبات قیمت جواهر', 'woo_crypto_manag' ); ?></h2>
            <!-- Make a call to the WordPress function for rendering errors when settings are saved. -->
            <?php settings_errors(); ?>

            <?php
                if (ini_get("allow_url_fopen") !=1)
                {
                    ?>

                    <div id="setting-error-boj_myplugin_texterror" class="error settings-error notice is-dismissible">
                        <p>
                            <strong>گزینه allow_url_fopen بر روی سرور شما فعال نیست ، برای استفاده از این افزونه لازم است این قابلیت فعالسازی شود!</strong>
                        </p>
                        <button type="button" class="notice-dismiss">
                            <span class="screen-reader-text">بستن این اعلان.</span>
                        </button>
                    </div>

                    <?php

                }
            ?>


            <?php $active_tab = isset( $_GET[ 'tab' ] ) ? $_GET[ 'tab' ] : 'gpu_display_options'; ?>
            <h2 class="nav-tab-wrapper">
                <a href="?page=woocommerce-gpu-managment&tab=gpu_display_options" class="nav-tab <?php echo $active_tab == 'gpu_display_options' ? 'nav-tab-active' : ''; ?>">تنظیمات</a>
                <a href="?page=woocommerce-gpu-managment&tab=gpu_display_advanced" class="nav-tab <?php echo $active_tab == 'gpu_display_advanced' ? 'nav-tab-active' : ''; ?>">پیشرفته</a>
            </h2>
            <form action="options.php" method="post">
                <?php if($active_tab == 'gpu_display_options') { ?>
                    <div>

                        <?php settings_fields( 'woo_crypto_manag_display_option' ); ?>
                        <?php do_settings_sections('woo_crypto_manag_display_option_tab_page'); ?>
                        <?php
                        submit_button();
                        ?>

                    </div>

                <?php }else{ ?>
                    <?php settings_fields( 'woo_crypto_manag_calculate_options' ); ?>

                    <div class="woo_crypto_manag_calculate_right_box"> <?php do_settings_sections('woo_crypto_manag_calculate_option_tab_page');  ?>
                        <?php
                          submit_button();
                        ?>
                    </div>
                    <div class="woo_crypto_manag_calculate_left_box">
                        <?php
                        $ayar_cost_18 = 0;
                        $ayar_cost_24 = 0;
                        if(get_option('ayar_cost_18',true))
                        {
                            $ayar_cost_18 = get_option('ayar_cost_18',true);
                        }
                        if(get_option('ayar_cost_24',true))
                        {
                            $ayar_cost_24 = get_option('ayar_cost_24',true);
                        }
                        ?>
                        <h2>به روز رسانی قیمت محصولات به صورت دستی</h2>
                        <div class="gpu_progressbar">
                            <div id="Progress_Status">
                                <div id="myprogressBar"></div>
                            </div>
                            <div id="number_product_updated_price">قیمت <strong></strong> محصول به روز رسانی شد !</div>
                        </div>
                        <div class="gold_cutie_price">
                            <table class="form-table">
                                <tbody>
                                    <tr>
                                        <th scope="row"> قیمت طلای 18 عیار(تومان) </th>
                                        <td>
                                            <input type="text" id="ayar_cost_18" name="ayar_cost_18" value="<?php echo $ayar_cost_18; ?>">
                                            <?php echo wc_help_tip( __( 'قیمت طلای 18 عیار را به تومان وارد کنید.', 'woo_crypto_manag' ) ); ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row"> قیمت طلای 24 عیار(تومان)</th>
                                        <td>
                                            <input type="text" id="ayar_cost_24" name="ayar_cost_24" value="<?php echo $ayar_cost_24; ?>">
                                            <?php echo wc_help_tip( __( 'قیمت طلای 24 عیار را به تومان وارد کنید.', 'woo_crypto_manag' ) ); ?>
                                        </td>
                                    </tr>
                                    <!--<tr>
                                        <td></td>
                                        <td><input type="submit" name="gpu_manual_update" id="gpu_manual_update" class="button button-secondary" value="به روز رسانی فوری"></td>
                                    </tr>-->
                                </tbody>
                            </table>
                        </div>

                        <div class="gpu_manual_update_button"  align="left">
                           <button name="gpu_update_btn" class="button button-secondary" id="gpu_update_btn">
                               به روز رسانی فوری
                           </button>
                        </div>
                    </div>



                <?php }  ?>

            </form>
        </div>
        <?php
    }

    // add section , filed option and register setting field by this function

    public function woo_crypto_manag_options()
    {
        if(!session_id()) {
            session_start();
        }
        // section and field for setting tab
        // If the woo crypto manag display options don't exist, create them.
        if( false == get_option( 'woo_crypto_manag_display_option' ) ) {
            add_option( 'woo_crypto_manag_display_option', apply_filters( 'woo_crypto_manag_default_display_options',  $this->woo_crypto_manag_default_display_options() ) );
        } // end if
        
        if(false == get_option('schedule_per_hour'))
        {
            add_option('schedule_per_hour','1');
        }

        /*add section for gpu display options*/
        add_settings_section('woo_crypto_manag_gold_meta_flields_section','فیلدهای سفارشی اطلاعات مهم جواهر',array($this , 'woo_crypto_manag_gold_meta_flields_section_callback'),'woo_crypto_manag_display_option_tab_page');

        /*add section for gpu meta fields*/
        add_settings_section('woo_crypto_manag_display_option_section','تنظیمات نمایش اطلاعات مهم جواهر',array($this , 'woo_crypto_manag_display_option_section_callback'),'woo_crypto_manag_display_option_tab_page');

        /*add setting fields*/

        add_settings_field('gpu_info_tab',' تب اطلاعات مهم جواهر',array($this , 'gpu_info_tab_callback'),'woo_crypto_manag_display_option_tab_page','woo_crypto_manag_gold_meta_flields_section',array(								// The array of arguments to pass to the callback. In this case, just a description.
            __( '  با فعالسازی این گزینه تب اطلاعات مهم جواهر در صفحه ویرایش محصولات ووکامرس اضافه خواهد شد که شامل فیلد وزن طلا ، نوع عیار و فیلد اجرت خواهد بود.', 'woo_crypto_manag' ),
        ));

        add_settings_field('gpu_meta_weight',' نامک فیلد سفارشی وزن',array($this , 'gpu_meta_weight_callback'),'woo_crypto_manag_display_option_tab_page','woo_crypto_manag_gold_meta_flields_section',array(								// The array of arguments to pass to the callback. In this case, just a description.
            __( ' اگر از قبل فیلد سفارشی برای وارد کردن وزن محصول ایجاد کرده اید نامک آن فیلد را اینجا وارد کنید.', 'woo_crypto_manag' ),
        ));

        add_settings_field('gpu_meta_cutie',' نامک فیلد سفارشی عیار',array($this , 'gpu_meta_cutie_callback'),'woo_crypto_manag_display_option_tab_page','woo_crypto_manag_gold_meta_flields_section',array(								// The array of arguments to pass to the callback. In this case, just a description.
            __( ' اگر از قبل فیلد سفارشی برای وارد کردن عیار محصول ایجاد کرده اید نامک آن فیلد را اینجا وارد کنید.', 'woo_crypto_manag' ),
        ));

        add_settings_field('gpu_meta_perc_wage',' نامک فیلد سفارشی درصد اجرت',array($this , 'gpu_meta_perc_wage_callback'),'woo_crypto_manag_display_option_tab_page','woo_crypto_manag_gold_meta_flields_section',array(								// The array of arguments to pass to the callback. In this case, just a description.
            __( ' اگر از قبل فیلد سفارشی برای وارد کردن درصد اجرت محصول ایجاد کرده اید نامک آن فیلد را اینجا وارد کنید.', 'woo_crypto_manag' ),
        ));

        add_settings_field('gpu_meta_toman_wage',' نامک فیلد سفارشی اجرت به تومان',array($this , 'gpu_meta_toman_wage_callback'),'woo_crypto_manag_display_option_tab_page','woo_crypto_manag_gold_meta_flields_section',array(								// The array of arguments to pass to the callback. In this case, just a description.
            __( ' اگر از قبل فیلد سفارشی برای وارد کردن اجرت به تومان محصول ایجاد کرده اید نامک آن فیلد را اینجا وارد کنید.', 'woo_crypto_manag' ),
        ));

        add_settings_field('display_wage','نمایش اجرت محصول',array($this , 'display_wage_callback'),'woo_crypto_manag_display_option_tab_page','woo_crypto_manag_display_option_section',array(								// The array of arguments to pass to the callback. In this case, just a description.
            __( ' با فعالسازی این گزینه اجرت محصول در صفحه ی محصول قبل از دکمه افزودن به سبد خرید نمایش داده خواهد شد.', 'woo_crypto_manag' ),
        ));

        add_settings_field('display_gram_price','نمایش قیمت طلا (گرم)',array($this , 'display_gram_price_callback'),'woo_crypto_manag_display_option_tab_page','woo_crypto_manag_display_option_section',array(								// The array of arguments to pass to the callback. In this case, just a description.
            __( ' با فعالسازی این گزینه قیمت هر گرم طلا بر اساس عیار محصول قبل از دکمه افزودن به سبد خرید نمایش داده خواهد شد.', 'woo_crypto_manag' ),
        ));

        add_settings_field('display_gram_weight','نمایش وزن طلا (گرم)',array($this , 'display_gram_weight_callback'),'woo_crypto_manag_display_option_tab_page','woo_crypto_manag_display_option_section',array(								// The array of arguments to pass to the callback. In this case, just a description.
        __( ' با فعالسازی این گزینه وزن طلای به کار رفته در محصول قبل از دکمه افزودن به سبد خرید نمایش داده خواهد شد.', 'woo_crypto_manag' ),
    ));
        add_settings_field('display_gold_cutie','نمایش عیار طلا',array($this , 'display_gold_cutie_callback'),'woo_crypto_manag_display_option_tab_page','woo_crypto_manag_display_option_section',array(								// The array of arguments to pass to the callback. In this case, just a description.
            __( ' با فعالسازی این گزینه نوع عیار طلای به کار رفته در محصول قبل از دکمه افزودن به سبد خرید نمایش داده خواهد شد.', 'woo_crypto_manag' ),
        ));

        add_settings_field('display_gold_stone_cost','نمایش قیمت سنگ',array($this , 'display_gold_stone_cost_callback'),'woo_crypto_manag_display_option_tab_page','woo_crypto_manag_display_option_section',array(								// The array of arguments to pass to the callback. In this case, just a description.
            __( ' با فعالسازی این گزینه قیمت سنگ به کار رفته در محصول قبل از دکمه افزودن به سبد خرید نمایش داده خواهد شد.', 'woo_crypto_manag' ),
        ));

        /*register setting fields for display option*/
        register_setting('woo_crypto_manag_display_option','woo_crypto_manag_display_option',array($this, 'woo_crypto_manag_display_option_validate'));

        // section and field for advanced tab

        // If the woo crypto manag calculate options don't exist, create them.
        if( false == get_option( 'woo_crypto_manag_calculate_options' ) ) {
            add_option( 'woo_crypto_manag_calculate_options', apply_filters( 'woo_crypto_manag_default_calculate_options',  $this->woo_crypto_manag_default_calculate_options() ) );
        } // end if



        /*add section for gpu calculate fields*/
        add_settings_section('woo_crypto_manag_calculate_option_section','تنظیمات محاسبات قیمت محصولات',array($this , 'woo_crypto_manag_calculate_option_section_callback'),'woo_crypto_manag_calculate_option_tab_page');

        /*add calculate fields to advanced tab*/

        add_settings_field('gpu_profit',' درصد سود',array($this , 'gpu_profit_callback'),'woo_crypto_manag_calculate_option_tab_page','woo_crypto_manag_calculate_option_section',array(								// The array of arguments to pass to the callback. In this case, just a description.
        __( ' میزان درصد سود طلا را تعیین کنید که به صورت پیشفرض 7 درصد است.', 'woo_crypto_manag' ),
        ));

        add_settings_field('gpu_tax',' درصد مالیات',array($this , 'gpu_tax_callback'),'woo_crypto_manag_calculate_option_tab_page','woo_crypto_manag_calculate_option_section',array(								// The array of arguments to pass to the callback. In this case, just a description.
            __( ' میزان درصد مالیات را تعیین کنید که به صورت پیشفرض 9 درصد است.', 'woo_crypto_manag' ),
        ));

        add_settings_field('gpu_calculate_schedule',' زمانبندی به روز رسانی قیمت ',array($this , 'gpu_calculate_schedule_callback'),'woo_crypto_manag_calculate_option_tab_page','woo_crypto_manag_calculate_option_section',array(								// The array of arguments to pass to the callback. In this case, just a description.
            __( ' با این گزینه می توانید به روز رسانی قیمت محصولات را برای حداقل هر ساعت یک بار تنظیم کنید برای به روز رسانی کمتر از یک ساعت باید وب سرویس لازم را تهیه کنید. مانند nerkh-api.ir', 'woo_crypto_manag' ),
        ));

        add_settings_field('gpu_calculate_product_cat',' تعیین دسته های محصول ',array($this , 'gpu_calculate_product_cat_callback'),'woo_crypto_manag_calculate_option_tab_page','woo_crypto_manag_calculate_option_section',array(								// The array of arguments to pass to the callback. In this case, just a description.
            __( ' دسته محصولاتی که می خوایید قیمت محصولات آن ها را به روز رسانی کنید انتخاب کنید.', 'woo_crypto_manag' ),
        ));


        /*register setting fields for calculate option*/
        //register_setting('woo_crypto_manag_calculate_options','woo_crypto_manag_calculate_options',array($this,'woo_crypto_manag_calculate_options_validate'));
        register_setting('woo_crypto_manag_calculate_options','woo_crypto_manag_calculate_options');

    }

    /*call the callback functions in display option section*/

    /*section callback function*/
    public function woo_crypto_manag_display_option_section_callback()
    {
        //echo '<p>لطفا قبل از تغییر هر فیلدی در این بخش راهنمای هر فیلد که با علامت سوال مشخص شده است را مطالعه بفرمائید!</p>';
    }
    public function woo_crypto_manag_gold_meta_flields_section_callback()
    {
        echo '<p>توجه! درصورتی که فیلدهای سفارشی برای نوع عیار ، وزن ، درصد اجرت یا اجرت به تومان از قبل ایجاد کرده اید لازم نیست گزینه اول را فعال سازی کنید.</p>';
    }

    /* section callback for advanced tab*/

     /**
     * Provides default values for the Display Options.
     */
     public function woo_crypto_manag_default_display_options() {

        $defaults = array(
            'gpu_info_tab'	=>	'0',
            'display_wage' => '0',
            'display_gram_price' => '1',
            'display_gram_weight' => '1',
            'display_gold_cutie' => '1',
            'display_gold_stone_cost' => '0',
            'gpu_meta_weight' => '',
            'gpu_meta_cutie' => '',
            'gpu_meta_perc_wage' => '',
            'gpu_meta_toman_wage' => '',
        );

        return apply_filters( 'woo_crypto_manag_default_display_options', $defaults );
        // return $defaults;

    }// end woo_crypto_manag_default_display_options

    /*callback function for create field in display option setting tab*/
    public function gpu_info_tab_callback($args)
    {

        // First, we read the options collection
        $options = get_option('woo_crypto_manag_display_option');

        // Next, we update the name attribute to access this element's ID in the context of the display options array
        // We also access the gpu_info_tab element of the options collection in the call to the checked() helper function
        $html = '<input type="checkbox" id="gpu_info_tab" name="woo_crypto_manag_display_option[gpu_info_tab]" value="1" ' . checked( 1, isset( $options['gpu_info_tab'] ) ? $options['gpu_info_tab'] : 0, false ) . '/>';

        // Here, we'll take the first argument of the array and add it to a label next to the checkbox
       //$html .= '<label for="gpu_info_tab">&nbsp;'  . $args[0] . '</label>';
        $html .= wc_help_tip( __( $args[0], 'woo_crypto_manag' ) );

        echo $html;

    }

    public function gpu_meta_weight_callback($args)
    {
        // First, we read the options collection
        $options = get_option('woo_crypto_manag_display_option');

        // Next, we update the name attribute to access this element's ID in the context of the display options array
        // We also access the gpu_info_tab element of the options collection in the call to the checked() helper function
        $html = '<input type="text" id="gpu_meta_weight" name="woo_crypto_manag_display_option[gpu_meta_weight]" value="'.$options['gpu_meta_weight'].'" />';

        // Here, we'll take the first argument of the array and add it to a label next to the checkbox
        //$html .= '<label for="gpu_info_tab">&nbsp;'  . $args[0] . '</label>';
        $html .= wc_help_tip( __( $args[0], 'woo_crypto_manag' ) );

        echo $html;
    }

    public function gpu_meta_cutie_callback($args)
    {
        // First, we read the options collection
        $options = get_option('woo_crypto_manag_display_option');

        // Next, we update the name attribute to access this element's ID in the context of the display options array
        // We also access the gpu_info_tab element of the options collection in the call to the checked() helper function
        $html = '<input type="text" id="gpu_meta_cutie" name="woo_crypto_manag_display_option[gpu_meta_cutie]" value="'.$options['gpu_meta_cutie'].'" />';

        // Here, we'll take the first argument of the array and add it to a label next to the checkbox
        //$html .= '<label for="gpu_info_tab">&nbsp;'  . $args[0] . '</label>';
        $html .= wc_help_tip( __( $args[0], 'woo_crypto_manag' ) );

        echo $html;
    }

    public function gpu_meta_perc_wage_callback($args)
    {
        // First, we read the options collection
        $options = get_option('woo_crypto_manag_display_option');

        // Next, we update the name attribute to access this element's ID in the context of the display options array
        // We also access the gpu_info_tab element of the options collection in the call to the checked() helper function
        $html = '<input type="text" id="gpu_meta_perc_wage" name="woo_crypto_manag_display_option[gpu_meta_perc_wage]" value="'.$options['gpu_meta_perc_wage'].'" />';

        // Here, we'll take the first argument of the array and add it to a label next to the checkbox
        //$html .= '<label for="gpu_info_tab">&nbsp;'  . $args[0] . '</label>';
        $html .= wc_help_tip( __( $args[0], 'woo_crypto_manag' ) );

        echo $html;
    }

    public function gpu_meta_toman_wage_callback($args)
    {
        // First, we read the options collection
        $options = get_option('woo_crypto_manag_display_option');

        // Next, we update the name attribute to access this element's ID in the context of the display options array
        // We also access the gpu_info_tab element of the options collection in the call to the checked() helper function
        $html = '<input type="text" id="gpu_meta_toman_wage" name="woo_crypto_manag_display_option[gpu_meta_toman_wage]" value="'.$options['gpu_meta_toman_wage'].'" />';

        // Here, we'll take the first argument of the array and add it to a label next to the checkbox
        //$html .= '<label for="gpu_info_tab">&nbsp;'  . $args[0] . '</label>';
        $html .= wc_help_tip( __( $args[0], 'woo_crypto_manag' ) );

        echo $html;
    }

    public function display_wage_callback($args)
    {

        // First, we read the options collection
        $options = get_option('woo_crypto_manag_display_option');

        // Next, we update the name attribute to access this element's ID in the context of the display options array
        // We also access the gpu_info_tab element of the options collection in the call to the checked() helper function
        $html = '<input type="checkbox" id="display_wage" name="woo_crypto_manag_display_option[display_wage]" value="1" ' . checked( 1, isset( $options['display_wage'] ) ? $options['display_wage'] : 0, false ) . '/>';

        // Here, we'll take the first argument of the array and add it to a label next to the checkbox
        $html .= wc_help_tip( __( $args[0], 'woo_crypto_manag' ) );

        echo $html;

    }

    public function display_gram_price_callback($args)
    {

        // First, we read the options collection
        $options = get_option('woo_crypto_manag_display_option');

        // Next, we update the name attribute to access this element's ID in the context of the display options array
        // We also access the gpu_info_tab element of the options collection in the call to the checked() helper function
        $html = '<input type="checkbox" id="display_gram_price" name="woo_crypto_manag_display_option[display_gram_price]" value="1" ' . checked( 1, isset( $options['display_gram_price'] ) ? $options['display_gram_price'] : 0, false ) . '/>';

        // Here, we'll take the first argument of the array and add it to a label next to the checkbox
        $html .= wc_help_tip( __( $args[0], 'woo_crypto_manag' ) );

        echo $html;

    }

    public function display_gram_weight_callback($args)
    {

        // First, we read the options collection
        $options = get_option('woo_crypto_manag_display_option');

        // Next, we update the name attribute to access this element's ID in the context of the display options array
        // We also access the gpu_info_tab element of the options collection in the call to the checked() helper function
        $html = '<input type="checkbox" id="display_gram_weight" name="woo_crypto_manag_display_option[display_gram_weight]" value="1" ' . checked( 1, isset( $options['display_gram_weight'] ) ? $options['display_gram_weight'] : 0, false ) . '/>';

        // Here, we'll take the first argument of the array and add it to a label next to the checkbox
        $html .= wc_help_tip( __( $args[0], 'woo_crypto_manag' ) );

        echo $html;

    }

    public function display_gold_cutie_callback($args)
    {

        // First, we read the options collection
        $options = get_option('woo_crypto_manag_display_option');

        // Next, we update the name attribute to access this element's ID in the context of the display options array
        // We also access the gpu_info_tab element of the options collection in the call to the checked() helper function
        $html = '<input type="checkbox" id="display_gold_cutie" name="woo_crypto_manag_display_option[display_gold_cutie]" value="1" ' . checked( 1, isset( $options['display_gold_cutie'] ) ? $options['display_gold_cutie'] : 0, false ) . '/>';

        // Here, we'll take the first argument of the array and add it to a label next to the checkbox
        $html .= wc_help_tip( __( $args[0], 'woo_crypto_manag' ) );

        echo $html;

    }

    public function display_gold_stone_cost_callback($args){

        // First, we read the options collection
        $options = get_option('woo_crypto_manag_display_option');

        // Next, we update the name attribute to access this element's ID in the context of the display options array
        // We also access the gpu_info_tab element of the options collection in the call to the checked() helper function
        $html = '<input type="checkbox" id="display_gold_stone_cost" name="woo_crypto_manag_display_option[display_gold_stone_cost]" value="1" ' . checked( 1, isset( $options['display_gold_stone_cost'] ) ? $options['display_gold_stone_cost'] : 0, false ) . '/>';

        // Here, we'll take the first argument of the array and add it to a label next to the checkbox
        $html .= wc_help_tip( __( $args[0], 'woo_crypto_manag' ) );

        echo $html;

    }

    public function woo_crypto_manag_display_option_validate($input)
    {
        // Create our array for storing the validated options
        $output = array();

        // Loop through each of the incoming options
        foreach( $input as $key => $value ) {

            // Check to see if the current option has a value. If so, process it.
            if( isset( $input[$key] ) ) {

                // Strip all HTML and PHP tags and properly handle quoted strings
                $output[$key] = strip_tags( stripslashes( $input[ $key ] ) );

            } // end if

        } // end foreach

        // Return the array processing any additional functions filtered by this action
        return apply_filters( 'woo_crypto_manag_display_option_validate', $output, $input );
    }

    /*start coding for create advanced tab*/

    /* section callback for advanced tab*/

    public function woo_crypto_manag_calculate_option_section_callback()
    {
        //echo '<p>توجه! درصورتی که فیلدهای سفارشی برای نوع عیار ، وزن ، درصد اجرت یا اجرت به تومان از قبل ایجاد کرده اید لازم نیست گزینه اول را فعال سازی کنید.</p>';
    }

    /**
     * Provides default values for the Display Options.
     */
    public function woo_crypto_manag_default_calculate_options() {

        $defaults = array(
            'gpu_calculate_product_cat' => array('gpu'),
        );

        return apply_filters( 'woo_crypto_manag_default_calculate_options', $defaults );
        // return $defaults;

    }// end woo_crypto_manag_default_calculate_options

    /*callback function for create field in advanced tab*/

    public function gpu_profit_callback($args)
    {

        // First, we read the options collection
        $options = get_option('woo_crypto_manag_calculate_options');

        // Next, we update the name attribute to access this element's ID in the context of the display options array
        // We also access the gpu_info_tab element of the options collection in the call to the checked() helper function
        $html = '<input type="number" id="gpu_profit" name="woo_crypto_manag_calculate_options[gpu_profit]" value="'.$options['gpu_profit'].'" />';

        // Here, we'll take the first argument of the array and add it to a label next to the checkbox
        $html .= wc_help_tip( __( $args[0], 'woo_crypto_manag' ) );

        echo $html;

    }

    public function gpu_tax_callback($args)
    {

        // First, we read the options collection
        $options = get_option('woo_crypto_manag_calculate_options');

        // Next, we update the name attribute to access this element's ID in the context of the display options array
        // We also access the gpu_info_tab element of the options collection in the call to the checked() helper function
        $html = '<input type="number" id="gpu_tax" name="woo_crypto_manag_calculate_options[gpu_tax]" value="'.$options['gpu_tax'].'" />';

        // Here, we'll take the first argument of the array and add it to a label next to the checkbox
        $html .= wc_help_tip( __( $args[0], 'woo_crypto_manag' ) );

        echo $html;

    }

    public function gpu_calculate_schedule_callback($args)
    {

        // First, we read the options collection
        $options = get_option('woo_crypto_manag_calculate_options');

        // Next, we update the name attribute to access this element's ID in the context of the display options array
        // We also access the gpu_info_tab element of the options collection in the call to the checked() helper function

        $html ='<select id="gpu_calculate_schedule" name="woo_crypto_manag_calculate_options[gpu_calculate_schedule]">';

        $html .= '<option value="1"' . selected( $options['gpu_calculate_schedule'], '1', false) . '>
هرساعت
 </option>';
        $html .= '<option value="3"' . selected( $options['gpu_calculate_schedule'], '3', false) . '>
هر 3 ساعت
 </option>';
        $html .= '<option value="6"' . selected( $options['gpu_calculate_schedule'], '6', false) . '>
هر 6 ساعت
 </option>';
        $html .= '<option value="9"' . selected( $options['gpu_calculate_schedule'], '9', false) . '>
هر 9 ساعت
 </option>';
        $html .= '<option value="12"' . selected( $options['gpu_calculate_schedule'], '12', false) . '>
هر 12 ساعت
 </option>';


        $html .='</select>';

        // Here, we'll take the first argument of the array and add it to a label next to the checkbox
        $html .= wc_help_tip( __( $args[0], 'woo_crypto_manag' ) );

        echo $html;

    }

    public function gpu_calculate_product_cat_callback($args)
    {

        $options_cat= get_option('woo_crypto_manag_calculate_options');
        if($options_cat['gpu_calculate_product_cat'])
        {
            $options_cat = $options_cat['gpu_calculate_product_cat'];
        }
        else
        {
            $options_cat = array('all');
        }


        // Next, we update the name attribute to access this element's ID in the context of the display options array
        // We also access the gpu_info_tab element of the options collection in the call to the checked() helper function

        $selected_all = in_array( 'all', $options_cat ) ? ' selected="selected" ' : '';
        $html ='<select class="chosen" multiple="true" id="gpu_calculate_product_cat" name="woo_crypto_manag_calculate_options[gpu_calculate_product_cat][]">';

        $html .= '<option value="all"' .$selected_all. '>
همه محصولات
 </option>';
        $terms = get_terms('product_cat', array(
            'hide_empty' => true,
            'orderby'  => 'id'
            //'childless'  => true
        ));

        foreach ($terms as $term) {

            $selected = in_array( $term->slug, $options_cat ) ? ' selected="selected" ' : '';
            $html .= '<option value="'.$term->slug.'"' .$selected. '>'.$term->name.'</option>';
        }

        $html .='</select>';

        // Here, we'll take the first argument of the array and add it to a label next to the checkbox
        $html .= wc_help_tip( __( $args[0], 'woo_crypto_manag' ) );

        echo $html;

    }


    public function woo_crypto_manag_calculate_options_validate($input)
    {
        // Create our array for storing the validated options
        $output = array();

        // Loop through each of the incoming options
        foreach( $input as $key => $value ) {

            // Check to see if the current option has a value. If so, process it.
            if( isset( $input[$key] ) ) {

                // Strip all HTML and PHP tags and properly handle quoted strings
                $output[$key] = strip_tags( stripslashes( $input[ $key ] ) );

            } // end if

        } // end foreach

        // Return the array processing any additional functions filtered by this action
        return apply_filters( 'woo_crypto_manag_calculate_options_validate', $output, $input );

    }

    /*add code for Override WooCommerce Template File*/

   public function redirect_woocommerce_locate_template( $template, $template_name, $template_path ) {


       global $woocommerce;

       $_template = $template;

       if ( ! $template_path ) $template_path = $woocommerce->template_url;

       $plugin_path  = WOO_CRYPTO_PLUGIN_PATH . '/woocommerce/';

       // Look within passed path within the theme - this is priority
       $template = locate_template(

           array(
               $template_path . $template_name,
               $template_name
           )
       );

       // Modification: Get the template from this plugin, if it exists
       if ( ! $template && file_exists( $plugin_path . $template_name ) )
           $template = $plugin_path . $template_name;

       // Use default template
       if ( ! $template )
           $template = $_template;

       // Return what we found
       return $template;
   }


    /*add necessary script to admin*/
    public function woo_crypto_manag_admin_script()
    {
        wp_register_script( 'woocommerce_gpu_manag_script', WC()->plugin_url() . '/assets/js/admin/woocommerce_admin.min.js', array( 'jquery', 'jquery-blockui', 'jquery-ui-sortable', 'jquery-ui-widget', 'jquery-ui-core', 'jquery-tiptip' ), WC_VERSION );

        wp_enqueue_style('woocommerce_gpu_manag_style', WC()->plugin_url() . '/assets/css/admin-rtl.css','', WC_VERSION );
        $params = array(

            'strings' => array(
                'gpu_info_tab' => __( '  با فعالسازی این گزینه تب اطلاعات مهم جواهر در صفحه ویرایش محصولات ووکامرس اضافه خواهد شد که شامل فیلد وزن طلا ، نوع عیار و فیلد اجرت خواهد بود.', 'woo_crypto_manag' ),
                'display_wage' => __( ' با فعالسازی این گزینه اجرت محصول در صفحه ی محصول قبل از دکمه افزودن به سبد خرید نمایش داده خواهد شد.', 'woo_crypto_manag' ),
                'display_gram_price' => __( ' با فعالسازی این گزینه قیمت هر گرم طلا بر اساس عیار محصول قبل از دکمه افزودن به سبد خرید نمایش داده خواهد شد.', 'woo_crypto_manag' ),
                'display_gram_weight' => __( ' با فعالسازی این گزینه وزن طلای به کار رفته در محصول قبل از دکمه افزودن به سبد خرید نمایش داده خواهد شد.', 'woo_crypto_manag' ),
                'display_gold_cutie' => __( ' با فعالسازی این گزینه نوع عیار طلای به کار رفته در محصول قبل از دکمه افزودن به سبد خرید نمایش داده خواهد شد.', 'woo_crypto_manag' ),
                'gpu_meta_weight' => __( 'اگر از قبل فیلد سفارشی برای وارد کردن وزن محصول ایجاد کرده اید نامک آن فیلد را اینجا وارد کنید.', 'woo_crypto_manag' ),
                'gpu_meta_cutie' => __( 'اگر از قبل فیلد سفارشی برای وارد کردن عیار محصول ایجاد کرده اید نامک آن فیلد را اینجا وارد کنید.', 'woo_crypto_manag' ),
                'display_gold_stone_cost' => __( 'با فعالسازی این گزینه قیمت سنگ به کار رفته در محصول قبل از دکمه افزودن به سبد خرید نمایش داده خواهد شد.', 'woo_crypto_manag' ),
                'gpu_meta_perc_wage' => __( 'اگر از قبل فیلد سفارشی برای وارد کردن درصد اجرت محصول ایجاد کرده اید نامک آن فیلد را اینجا وارد کنید.', 'woo_crypto_manag' ),
                'gpu_meta_toman_wage' => __( 'اگر از قبل فیلد سفارشی برای وارد کردن اجرت به تومان محصول ایجاد کرده اید نامک آن فیلد را اینجا وارد کنید.', 'woo_crypto_manag' ),
                'gpu_profit' => __( 'میزان درصد سود طلا را تعیین کنید که به صورت پیشفرض 7 درصد است.', 'woo_crypto_manag' ),
                'gpu_tax' => __( 'میزان درصد مالیات طلا را تعیین کنید که به صورت پیشفرض 9 درصد است.', 'woo_crypto_manag' ),
                'gpu_calculate_schedule' => __( 'با این گزینه می توانید به روز رسانی قیمت محصولات را برای حداقل هر ساعت یک بار تنظیم کنید برای به روز رسانی کمتر از یک ساعت باید وب سرویس لازم را تهیه کنید. مانند nerkh-api.ir', 'woo_crypto_manag' ),
                'gpu_calculate_product_cat' => __( 'دسته محصولاتی که می خوایید قیمت محصولات آن ها را به روز رسانی کنید انتخاب کنید.', 'woo_crypto_manag' ),
                'ayar_cost_18' => __( 'قیمت طلای 18 عیار را به تومان وارد کنید.', 'woo_crypto_manag' ),
                'ayar_cost_24' => __( 'قیمت طلای 24 عیار را به تومان وارد کنید.', 'woo_crypto_manag' ),
            ),
            'urls' => array(
                'gpu_info_tab' => esc_url_raw( admin_url( 'admin.php?page=woocommerce-gpu-managment' ) ),
                'display_wage' => esc_url_raw( admin_url( 'admin.php?page=woocommerce-gpu-managment' ) ),
                'display_gram_price' => esc_url_raw( admin_url( 'admin.php?page=woocommerce-gpu-managment' ) ),
                'display_gram_weight' => esc_url_raw( admin_url( 'admin.php?page=woocommerce-gpu-managment' ) ),
                'display_gold_cutie' => esc_url_raw( admin_url( 'admin.php?page=woocommerce-gpu-managment' ) ),
                'display_gold_stone_cost' => esc_url_raw( admin_url( 'admin.php?page=woocommerce-gpu-managment' ) ),
                'gpu_meta_weight' => esc_url_raw( admin_url( 'admin.php?page=woocommerce-gpu-managment' ) ),
                'gpu_meta_cutie' => esc_url_raw( admin_url( 'admin.php?page=woocommerce-gpu-managment' ) ),
                'gpu_meta_perc_wage' => esc_url_raw( admin_url( 'admin.php?page=woocommerce-gpu-managment' ) ),
                'gpu_meta_toman_wage' => esc_url_raw( admin_url( 'admin.php?page=woocommerce-gpu-managment' ) ),
                'gpu_profit' => esc_url_raw( admin_url( 'admin.php?page=woocommerce-gpu-managment' ) ),
                'gpu_tax' => esc_url_raw( admin_url( 'admin.php?page=woocommerce-gpu-managment' ) ),
                'gpu_calculate_schedule' => esc_url_raw( admin_url( 'admin.php?page=woocommerce-gpu-managment' ) ),
                'gpu_calculate_product_cat' => esc_url_raw( admin_url( 'admin.php?page=woocommerce-gpu-managment' ) ),
                'ayar_cost_18' => esc_url_raw( admin_url( 'admin.php?page=woocommerce-gpu-managment' ) ),
                'ayar_cost_24' => esc_url_raw( admin_url( 'admin.php?page=woocommerce-gpu-managment' ) ),


            ),
        );

        wp_localize_script( 'woocommerce_gpu_manag_script', 'woocommerce_admin', $params );
        wp_enqueue_script( 'woocommerce_gpu_manag_script' );

        wp_enqueue_style('woocommerce_gpu_manag_admin_style',plugin_dir_url(__FILE__).'../assets/css/admin.css','','1.0');

        wp_enqueue_script('woocommerce_gpu_manag_chosen_script',plugin_dir_url(__FILE__).'../assets/js/chosen.jquery.js','','0.9.1');

        wp_enqueue_script('woocommerce_gpu_manag_admin_script',plugin_dir_url(__FILE__).'../assets/js/admin.js','','1.0');

        // Get current page protocol
        $protocol = isset( $_SERVER["HTTPS"]) ? 'https://' : 'http://';
        $dataToBePassed = array(
            'ajaxurl'   => admin_url( 'admin-ajax.php', $protocol ),
        );
        wp_localize_script( 'woocommerce_gpu_manag_admin_script', 'ajurl', $dataToBePassed );


        wp_enqueue_style('woocommerce_gpu_manag_chosen_style',plugin_dir_url(__FILE__).'../assets/css/chosen.css','','1.0');
    }

    public function woo_crypto_template_style()
    {
        if (is_single())
        {
            wp_enqueue_style('woocommerce_gpu_manag_template_style',plugin_dir_url(__FILE__).'../assets/css/gpu_front.css','','1.0');

        }
    }

}


// add file for craete cryptolary important info tab in woocommerce edit page

require_once (plugin_dir_path(__FILE__).'/woo_crypto_info_tab.php');


// add file for get price

require_once (plugin_dir_path(__FILE__).'/simple_html_dom.php');

/* add file for manual update product price */

require_once (plugin_dir_path(__FILE__).'/woo_crypto_manual_update_price.php');

/* add file for show gpu info in woocommerce product page */

require_once (plugin_dir_path(__FILE__).'/woo_crypto_template.php');


