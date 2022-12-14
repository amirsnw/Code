DastineSign = {
    SignCallBack: "",
    sign: function (dataForSign, callbackSign) {
         
        DastineSign.SignCallBack = callbackSign;
        var cmsSignResult;
        var me = this;
//        var settingId = dataForSign.settingId;
        Dastine.CmsSign(dataForSign, false, function (event) {
            cmsSignResult = event.data.Result;
            if ((cmsSignResult === '11') || (cmsSignResult === '10')) {
                // Because the card is not logged in, it may still not be read 
                // Or the card is not read correctly
                var issuer = "";
                var keyUsages = "";
                 
                Dastine.SelectCertificateFromTokenByUI(issuer, keyUsages, function (event) {
                    var result = event.data.Result;
                    if (result.length === 2) { // SelectCertificateFromTokenByUI returned error code
                        event.data.Result = '';
                        me.handleErrorCodes(result);
//                        me.deleteSetting(settingId);
                         
                        DastineSign.TriggerOutput(event);
                    } else if (result === '0') {
                         
                        Dastine.GetSelectedCertificate(function (Cevent) {
                             
                            var crtError = Cevent.data.Result;
                            if (crtError.length === 2) {
                                event.data.Result = '';
                                me.handleErrorCodes(result);
//                                me.deleteSetting(settingId);
                                 
                                DastineSign.TriggerOutput(event);
                            } else {
                                Dastine.CmsSign(dataForSign, false, function (event) {
                                    cmsSignResult = event.data.Result;
                                    if (cmsSignResult.length === 2) {
                                        event.data.Result = '';
                                        me.handleErrorCodes(result);
//                                        me.deleteSetting(settingId);
                                         
                                        DastineSign.TriggerOutput(event);
                                    }
                                    event.data.Result = cmsSignResult;
                                     
                                    DastineSign.TriggerOutput(event);
                                });
                            }
                        });
                    }
                });
            } else if (cmsSignResult.length === 2) {
                event.data.Result = '';
                me.handleErrorCodes(cmsSignResult);
//                me.deleteSetting(settingId);
                 
                DastineSign.TriggerOutput(event);
            } else {
                // the card is read correctly and has no error
//                return cmsSignResult;
                event.data.Result = cmsSignResult;
                 
                DastineSign.TriggerOutput(event);
            }
        });
    },
    handleErrorCodes: function (errorCode) {
        if (errorCode === '10')
            Ext.Msg.alert('پيام سيستم', 'خطاي نامشخص');
        else if (errorCode === '11')
            Ext.Msg.alert('پيام سيستم', 'گواهي امضاي ديجيتال انتخاب نشده است ');
        else if (errorCode === '14')
            Ext.Msg.alert('پيام سيستم', 'پين انتخاب نشده است ');
        else if (errorCode === '18')
            Ext.Msg.alert('پيام سيستم', 'انصراف توسط کاربر ');
        else if (errorCode === '20')
            Ext.Msg.alert('پيام سيستم', 'خطاي سطح دسترسي');
        else if (errorCode === '24' || errorCode === '25')
            Ext.Msg.alert('پيام سيستم', 'لطفا کارت خود را وارد نمایید.');
        else if (errorCode === '29')
            Ext.Msg.alert('پيام سيستم', 'پين کارت بلاک شده است');
        else if (errorCode === '30' || errorCode === '56')
            Ext.Msg.alert('پيام سيستم', 'خطا در امضاي ديجيتال');
        else if (errorCode === '34')
            Ext.Msg.alert('پيام سيستم', 'خطادر فرمت اطلاعات ورودي');
        else if (errorCode === '80' || errorCode === '84' || errorCode === '85' || errorCode === '86')
            Ext.Msg.alert('پيام سيستم', 'خطادر فايل تنظيمات دستينه  ');
        else if (errorCode === '90')
            Ext.Msg.alert('پيام سيستم', ' کارت بلاک شده است');
        else if (errorCode >= '91' && errorCode <= '99')
            Ext.Msg.alert('پيام سيستم', ' پين اشتباه است يک تلاش باقي مانده است');
        else
            Ext.Msg.alert('پيام سيستم', 'متاسفانه یک خطای پیش بینی نشده با کد' + errorCode + 'اتفاق افتاده.لطفا مجددا سعی نمایید و یا به مدیرسیستم اطلاع دهید');
    },
//    deleteSetting: function (settingId) {
//         
//        Ext.Ajax.request({
//            url: IncomeBank.helper.Urls.getUrl('deleteSetting') + "/" + settingId,
//            method: 'DELETE',
//            success: function (response, opts) {
//                 
//                console.log('delete preSaved setting successfully');
//            },
//            failure: function (response, opts) {
//                // exception occured in deleting preSaved data
//                // supporter should delete data manually in database
//                 
//                IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', 'خطا در پاکسازی دیتا با شناسه ' + settingId + '.لطفا شناسه را به مدیر سیستم اطلاع دهید');
//
//            }
//        });
//    },
    TriggerOutput: function (event) {
         
        if (DastineSign.SignCallBack)
            DastineSign.SignCallBack(event);
        else
            console.log("DastineSign sign method callback not set.");
    }
}


