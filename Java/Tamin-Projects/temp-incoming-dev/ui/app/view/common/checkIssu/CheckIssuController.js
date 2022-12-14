Ext.define('IncomeBank.view.shortterm.common.CheckIssuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.checkIssu',
    requires: ['IncomeBank.tamin.window.MessageBox'],
    init: function () {
        this.getViewModel().set('formData', {});
//        var form = Ext.getCmp('checkIssuForm');
//        form.reset();

    },
    initFormData: function (mode, button) {
        var me = this;
        var selectedHead = this.getViewModel().get('selectedHead');
        this.getViewModel().set('mode', mode);
        Ext.getBody().mask('در حال محاسبه مبلغ چک...');
        Ext.Ajax.request({
            url: IncomeBank.helper.Urls.getUrl('getSumAmmountForCheckIssu'),
            method: 'PUT',
            jsonData: selectedHead,
            callback: function (options, success, response) {
                Ext.getBody().unmask();
                if (success) {
                    var data = Ext.JSON.decode(response.responseText).data;
                    me.getViewModel().set('checkAmmount', data.sum);
                    me.getViewModel().set('formData.checkAmmount', data.sum.toString().replace(/.(?=(?:.{3})+$)/g, '$&,'));
                    me.getViewModel().set('checkSign', data.checkSign);
                    me.getViewModel().set('userSimEnabled', data.userSimEnabled);
                } else {
                    if (response !== undefined && response !== null && response.status === 403) {
                        IncomeBank.tamin.window.MessageBox.showError('خطای دسترسی', 'کاربر گرامی شما به این عملیات دسترسی ندارید');
                        return;
                    }
                    IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', 'خطا  در دریافت اطلاعات');
                }
            }


        });
    },
    onCancelCheckIssu: function () {
        var me = arguments[0];
        var win = me.up('window');
        win.close();
    },
    onCheckIssu: function (button) {
        var me = this;
        var form = Ext.getCmp('checkIssuForm');
        if (!form.isValid()) {
            IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', 'لطفا خطاهای مشخص شده را اصلاح نمایید');
            return;
        }
        var formData = me.getViewModel().get('formData');
        var selectedHead = this.getViewModel().get('selectedHead');

        var checkDate = new Date(formData.checkDateTimeStamp);
        var today = new Date();

        checkDate.setHours(0);
        checkDate.setMinutes(0);
        checkDate.setSeconds(0);
        checkDate.setMilliseconds(0);
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);

//        if (checkDate > today) {
//            IncomeBank.tamin.window.MessageBox.showInfo('پیام سیستم', 'تاریخ چک نمیتواند بزرگتر از تاریخ روز باشد');
//            return;
//        }
        var mode = me.getViewModel().get('mode');

        if (mode === 'insert' && checkDate < today) {
            IncomeBank.tamin.window.MessageBox.showInfo('پیام سیستم', 'تاریخ چک نمیتواند کوچکتر از تاریخ روز باشد');
            return;
        }

        var inputForIssuCheck = {payHeadIdList: {}};
        inputForIssuCheck.payHeadIdList = selectedHead;
        inputForIssuCheck.checkDateTimeStamp = checkDate.getTime();
        inputForIssuCheck.checkNo = formData.checkNo;
        inputForIssuCheck.checkAmount = me.getViewModel().get('checkAmmount');


        var url;
        var method;
        if (mode === 'insert') {
            url = IncomeBank.helper.Urls.getUrl('insertCheckInfo');
        } else if (mode === 'update') {
            url = IncomeBank.helper.Urls.getUrl('updateCheckInfo');
        }

        var win1 = button.up('window').getEl();

        var checkSign = me.getViewModel().get('checkSign');
        var userSimEnabled = me.getViewModel().get('userSimEnabled');

        Ext.getBody().mask();
        win1.mask('در حال ثبت اطلاعات چک...');

        Ext.Ajax.request({
            url: url,
            method: 'PUT',
            jsonData: inputForIssuCheck,
            callback: function (options, success, response) {
                Ext.getBody().unmask();
                win1.unmask();
                if (success) {
//                    if (checkSign && userSimEnabled) {
//                        //------///sign
//                        var data = Ext.decode(response.responseText).data;
//                        var repeatedCheckNo = data.repeatedCheckNo;
//                        if (repeatedCheckNo === false) {
//                            var payHeadId = data.editCheckInfo.payHeadId;
//
//                            Ext.Msg.confirm('پیام سیستم', 'اطلاعات با موفقیت جهت امضا ارسال و درخواست امضا به همراه شما ارسال گردید.آیا ذخیره اطلاعات با امضا خود را تایید مینمایید؟', function (id, value) {
//                                if (id === 'yes') {
//                                    Ext.getBody().mask();
//                                    win1.mask('در حال ارسال اطلاعات...');
//                                    Ext.Ajax.request({
//                                        url: IncomeBank.helper.Urls.getUrl('finalSaveWithSign'),
//                                        method: 'PUT',
//                                        jsonData: data.editCheckInfo,
//                                        success: function (response, opts) {
//                                            Ext.getBody().unmask();
//                                            win1.unmask();
//                                            var listGrid = Ext.getCmp('paybychecklist-grid');
//                                            listGrid.getStore().load();
//                                            IncomeBank.tamin.window.MessageBox.showInfo('پیام سیستم', 'اطلاعات چک با موفقیت امضا و ذخیره شدند.');
//                                            var win = Ext.getCmp('checkIssuWidget');
//                                            win.close();
//                                        },
//                                        failure: function (response, opts) {
//                                            Ext.getBody().unmask();
//                                            win1.unmask();
//                                            //اطلاعات ذخیره شده باید برگشت داده شوند
//                                            // اگر رکورد جدید بود کلا رکورد جدید حذف شود
//                                            //اگر بروزرسانی بود اطلاعات قبلی برگردانده شوند
//                                            me.reverseData(data.editCheckInfo, payHeadId, mode);
//                                            if (response !== undefined && response !== null && response.status === 403) {
//                                                IncomeBank.tamin.window.MessageBox.showError('خطای دسترسی', 'کاربر گرامی شما به این عملیات دسترسی ندارید');
//                                                return;
//                                            }
//                                            var responseText = Ext.decode(response.responseText);
//                                            if (responseText !== undefined && responseText !== null) {
//                                                IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', responseText.data);
//                                            } else {
//                                                IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', 'خطا درعملیات');
//                                            }
//                                        }
//                                    });
//                                } else {
//                                    IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', 'لغو عملیات ذخیره توسط کاربر.');
//                                    me.reverseData(data.editCheckInfo, payHeadId, mode);
//                                }
//                            });
//                        } else
//                        {
//                            IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', 'شماره چک تکراری');
//                        }
                        //------///sign
                  //  } else {//whitout sign

                        var data = Ext.decode(response.responseText).data;
                        var repeatedCheckNo = data.repeatedCheckNo;
                        if (repeatedCheckNo === true) {
                            IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', 'شماره چک تکراری می باشد.');
                        } else {

                            IncomeBank.tamin.window.MessageBox.showInfo('پیام سیستم', 'ثبت اطلاعات چک  موفقیت انجام شد.');

                            var listGrid = Ext.getCmp('paybychecklist-grid');
                            listGrid.getStore().load();

                            var win = Ext.getCmp('checkIssuWidget');
                            win.close();
                        }

                    //}

                } else { // failure
                    if (response !== undefined && response !== null && response.status === 403) {
                        IncomeBank.tamin.window.MessageBox.showError('خطای دسترسی', 'کاربر گرامی شما به این عملیات دسترسی ندارید');
                        return;
                    }
                    var responseText = Ext.JSON.decode(response.responseText);
                    if (responseText !== undefined && responseText.data !== undefined && responseText.data.message !== undefined && responseText.data.message !== '') {
                        IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', responseText.data.message);
                    } else if (responseText !== undefined && responseText.data !== undefined) {
                        IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', responseText.data);
                    } else {
                        IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', 'خطا  در عملیات');
                    }
                }
            }
        });
    },
    reverseData: function (data, payHeadId, mode) {
        var data = data;
        Ext.Ajax.request({
            url: IncomeBank.helper.Urls.getUrl('reverseData') + "/" + payHeadId + "/" + mode,
            method: 'DELETE',
            jsonData: data,
            success: function (response, opts) {
                console.log('reverse preEdited setting successfully' + response.status);
            },
            failure: function (response, opts) {
                IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', 'خطا در پاکسازی دیتا');

            }
        });
    }
});
