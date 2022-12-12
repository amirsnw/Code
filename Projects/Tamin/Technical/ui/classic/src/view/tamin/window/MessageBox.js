Ext.define('InsuranceTechnical.tamin.window.MessageBox', {
    statics: {
        showYesNo: function (title, message, owner, handler) {
            Ext.Msg.show({
                title: title,
                message: message,
                buttons: Ext.Msg.YESNO,
                fn: handler,
                animateTarget: owner,
                icon: Ext.Msg.QUESTION,
                animateShadow : true,
                defaultButton  : '',
                alwaysOnTop : true
            });
        },
        showError: function (title, message, owner, handler) {
            // Ext.create('Ext.window.MessageBox', {
            //     // set closeAction to 'destroy' if this instance is not
            //     // intended to be reused by the application
            //     closeAction: 'destroy'
            // }).show({
            //         title: title,
            //         message: message,
            //         buttons: Ext.Msg.YESNO,
            //         fn: handler,
            //         animateTarget: owner,
            //         icon: Ext.Msg.ERROR,
            //         animateShadow : true,
            //         defaultButton  : ''
            // });



            //
            //
            Ext.Msg.show({
                closeAction: 'destroy',
                title: title,
                message: message,
                buttons: Ext.Msg.OK,
                fn: handler,
                animateTarget: owner,
                icon: Ext.Msg.ERROR,
                animateShadow : true,
                defaultButton  : ''
            });
        },
        showLoadingDataError: function (owner, handler) {
            Ext.Msg.show({
                title: 'خطا',
                message: 'خطا در برقراری ارتباط با سرویس دهنده مرکزی',
                buttons: Ext.Msg.OK,
                fn: handler,
                animateTarget: owner,
                icon: Ext.Msg.ERROR,
                animateShadow : true,
                defaultButton  : ''
            });
        },
        showLoadingDataErrorRetry: function (owner, handler) {
            Ext.Msg.show({
                title: 'خطا',
                message: 'خطا در برقراری ارتباط با سرویس دهنده مرکزی',
                buttons: Ext.Msg.OKCANCEL,
                buttonText:{
                    ok: 'سعی مجدد',
                    cancel: 'انصراف'
                },
                fn: handler,
                animateTarget: owner,
                icon: Ext.Msg.ERROR,
                animateShadow : true,
                defaultButton  : ''
            });
        },

        showInfo: function (title, message, owner, handler) {
            Ext.Msg.show({
                title: title,
                message: message,
                buttons: Ext.Msg.OK,
                fn: handler,
                animateTarget: owner,
                icon: Ext.Msg.INFO,
                animateShadow : true
            });
        }
    }
});

