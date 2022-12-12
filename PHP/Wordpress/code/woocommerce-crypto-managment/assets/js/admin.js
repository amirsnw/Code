jQuery(document).ready(function(){

    jQuery(".chosen").data("placeholder","دسته محصولات مورد نظر رانتخاب کنید ...").chosen();

});

function gpu_update_progressbar($)
{
    alert('progress');
}


function gpu_update_price($)
{
    var ayar_cost_18 = $('#ayar_cost_18').val();
    var ayar_cost_24 = $('#ayar_cost_24').val();

    var mydata = {

        ayar_cost_18: ayar_cost_18,
        ayar_cost_24: ayar_cost_24,
        action: "crypto_manual_update_price",
    };


    // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php

    jQuery.ajax({
        type: "post",
        url: ajurl.ajaxurl,
        dataType: "json",
        data: mydata,
        success: function (data) {

            if(data.update_status)
            {
                $('.gpu_progressbar').css('display','block');
                var total_product_count = parseInt(data.update_status);
                var element = document.getElementById("myprogressBar");
                var width_step = 1;
                var width_percent = 0;
                var identity = setInterval(scene, 200);
                function scene() {
                    if (width_percent >= 100) {
                        clearInterval(identity);
                        $('#number_product_updated_price').children('strong').text(total_product_count);
                        $('#number_product_updated_price').css('display','block');

                    } else {

                        width_percent = parseInt(width_step/total_product_count*100);
                        element.style.width = width_percent + '%';
                        element.innerHTML = width_percent * 1  + '%';
                        width_step++;
                    }
                }
            }
            else
            {

                alert('error');

            }

        },
        error: function (errorMessage) {
            alert('hych');
            console.log(errorMessage);
        }
    });
}


(function( $ ) {
    'use strict';

    $(function() {

        $( '#gpu_update_btn' ).on( 'click', function( evt ) {

            // Stop the anchor's default behavior
            evt.preventDefault();

            // Display the media uploader
            gpu_update_price($);

        });

    });

})( jQuery );


