Ext.define('IncomeBank.view.telegraph.telInfo.TelInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.telInfoController',
    init: function () {
        if (window.location.href.indexOf('#telInfo/1') > -1) {
            IncomeBank.getApplication().addCache('brchCode', '9900');
        } else {
            IncomeBank.getApplication().addCache('brchCode', '9901');
        }
        Ext.getCmp('telInfo-brchCode').setDisabled(false);
        Ext.getCmp('telInfo-brchCode').setValue("9900 - شعبه مرکزي (ستاد سازمان تامين اجتماعي )");
        Ext.getCmp('telInfo-brchCode').setReadOnly(true);
        // var userOrganizationCode = IncomeBank.getApplication().getCache('userOrganizationCode');
        // if (userOrganizationCode != 'undefined'){
        //     Ext.getCmp('telInfo-brchCode').setValue(userOrganizationCode);
        // }

        // Ext.getCmp('flagAmount').setValue(this.defaultValue);
        // var me = this;
        // var date = new Date();
        // date = IncomeBank.tamin.helpers.Persian.gregorianToPersian(date);
        // var yearMonth = date.substr(0, 7);
        //
        // Ext.getCmp('telInfo-compMdate').setValue(yearMonth);
        // Ext.getCmp('telInfo-day').setValue('00');

    },
    onSearchButton: function (button) {
        var me = this;
        var grid = Ext.getCmp('telInfoDetGrid');
        var mainGrid = Ext.getCmp('telInfoGrid');
        var flagAmount = Ext.getCmp('flagAmount').getValue();
        if (!Ext.getCmp('telInfo_formId').isFormValid()) {
            IncomeBank.tamin.window.MessageBox.showError('خطا', 'لطفا ابتدا سال و ماه و شعبه را انتخاب نمایید.');
            return;
        }

        if (Ext.getCmp('telInfo-day').getValue() !== null && Ext.getCmp('telInfo-day').getValue() > 31) {
            IncomeBank.tamin.window.MessageBox.showInfo('پیام سیستم', 'تاریخ روز نمی تواند بیشتر از 31 باشد');
            return;
        }
        var searchValues = button.up('form').getForm().getValues();
        var store = me.getViewModel().getStore('telInfo');
        store.clearFilter();
        var result = [];

        Ext.Object.each(searchValues, function (property, value) {

            if (property === "compMdate" && value !== '') {
                var date = Ext.getCmp('telInfo-compMdate').getValue();
                var year = IncomeBank.tamin.PDate.getFullYear(date).toString();
                var month = IncomeBank.tamin.PDate.getMonth(date) + 1;
                if (month.toString().length === 1)
                    month = '0' + month;
                var obj = {};
                obj.property = property;
                obj.value = year + month;
                obj.operator = 'EQUAL';
                result.push(obj);
            }
            // else if (property === "brhCode" && value !== '') {
            //     var obj = {};
            //     obj.property = property;
            //     obj.value = "9900";
            //     obj.operator = 'EQUAL';
            //     result.push(obj);
            // }
            else if (property === "day" && value !== '') {
                var obj = {};
                obj.property = property;
                obj.value = value;
                obj.operator = 'EQUAL';
                result.push(obj);
            } else if (property === "flagAmount" && value !== '') {
                var obj = {};
                obj.property = property;
                obj.value = value;
                obj.operator = 'EQUAL';
                result.push(obj);
            }
            var obj = {};
            obj.property = "brhCode";
            obj.value = IncomeBank.getApplication().getCache('brchCode');
            obj.operator = 'EQUAL';
            result.push(obj);

        });
        store.addFilter(result);
        store.load({
            callback: function () {

                var size = me.getViewModel().getStore('telInfo').getCount();
                if (size !== 0) {

                    var totalAmount = mainGrid.getStore().getAt(0).data.totalAmount;
                    var totalCurrOldAmount = mainGrid.getStore().getAt(0).data.totalCurrOldAmount;

                    me.getViewModel().set('telInfoData.sumAmt', totalAmount.toString().replace(/.(?=(?:.{3})+$)/g, '$&,'));
                    me.getViewModel().set('telInfoData.sum', totalCurrOldAmount.toString().replace(/.(?=(?:.{3})+$)/g, '$&,'));

                    var sorters = [];
                    sorters.push({
                        property: grid.getStore().sorters.items[0].config.property,
                        direction: grid.getStore().sorters.items[0].config.direction
                    });
                    Ext.Ajax.request({
                        url: IncomeBank.helper.Urls.getUrl("bankTelInfo") + '?filter=' + JSON.stringify(result) + '&sort=' + JSON.stringify(sorters),
                        method: 'GET',
                        callback: function (options, success, response) {
                            if (success) {

                                var resp = Ext.JSON.decode(response.responseText);
                                var result = [];
                                for (var index = 0; index <= 5; index++) {
                                    result.push(resp.data.list[index]);
                                }
                                me.getViewModel().set('telInfoData.ghaty', resp.data.list[6].description);

                                grid.getStore().setData(result);
                            }
                        }
                    });

                } else {
                    me.getViewModel().set('telInfoData', ' ');
                    var store1 = me.getViewModel().getStore('bankTelInfo');
                    store1.clearFilter(true);
                    store1.load();
                }
            }
        });
    },
    onExtTelInfo: function (button) {
        var me = this;
        var ghaty;
        if (button.id === "baravord")
            ghaty = "0";
        else
            ghaty = "1";

        if (!Ext.getCmp('telInfo_formId').isFormValid()) {
            IncomeBank.tamin.window.MessageBox.showError('خطا', 'لطفا ابتدا سال و ماه و شعبه را انتخاب نمایید.');
            return;
        }

        if (Ext.getCmp('telInfo-day').getValue() !== null && Ext.getCmp('telInfo-day').getValue() > 31) {
            IncomeBank.tamin.window.MessageBox.showInfo('پیام سیستم', 'تاریخ روز نمی تواند بیشتر از 31 باشد');
            return;
        }
        var userOrganizationCode = IncomeBank.getApplication().getCache('userOrganizationCode');
        var userRole = IncomeBank.getApplication().getCache('userRole');
        if (userOrganizationCode === undefined || Ext.Array.intersect(userRole, ["SETAD_USER"]).length === 0){
            IncomeBank.tamin.window.MessageBox.showInfo('پیام سیستم', 'تنها کاربر ستادی بانک درآمد اجازه محاسبه را دارد');
            return;
        }
        if (Ext.getCmp('telInfo-day').getValue() !== null && Ext.getCmp('telInfo-day').getValue() !== "00") {
            Ext.Msg.confirm('پیام سیستم', 'فقط برگ پرداختهای های روز ' + Ext.getCmp('telInfo-day').getValue() + 'درمحاسبه منظور می شود آیا مطمئن هستید؟', function (id, value) {
                if (id === 'yes') {
                    var filters = [];

                    var date = Ext.getCmp('telInfo-compMdate').getValue();
                    var year = IncomeBank.tamin.PDate.getFullYear(date).toString();
                    var month = IncomeBank.tamin.PDate.getMonth(date) + 1;
                    if (month.toString().length === 1)
                        month = '0' + month;

                    // var brhCode = Ext.getCmp('telInfo-brchCode').getValue();
                    var brhCode = IncomeBank.getApplication().getCache('brchCode');

                    filters.push({property: 'drmdTelInfoPK.year', value: year, operator: "EQUAL"});
                    filters.push({property: 'drmdTelInfoPK.month', value: month, operator: "EQUAL"});
                    filters.push({property: 'drmdTelInfoPK.brhCode', value: brhCode, operator: "EQUAL"});

                    if (Ext.getCmp('telInfo-day').getValue() !== null) {
                        filters.push({
                            property: 'drmdTelInfoPK.day',
                            value: Ext.getCmp('telInfo-day').getValue(),
                            operator: "EQUAL"
                        });
                    }

                    Ext.Ajax.request({
                        url: IncomeBank.helper.Urls.getUrl("drmdTelInfo") + '?filter=' + JSON.stringify(filters),
                        method: 'GET',
                        callback: function (options, success, response) {
                            if (success) {

                                var resp = Ext.JSON.decode(response.responseText);
                                if (resp.data.total !== 0) {
                                    Ext.Msg.confirm('پیام سیستم', 'استخراج اطلاعات آمار وصولی قبلا انجام گرفته  است ، آیا مجددا تکرار شود؟', function (id, value) {
                                        if (id === 'yes') {
                                            //mohasebe
                                            filters.push({property: 'ghaty', value: ghaty, operator: "EQUAL"});
                                            me.prcexttelinfo(filters);
                                        }

                                    });

                                } else {
                                    //mohasebe
                                    filters.push({property: 'ghaty', value: ghaty, operator: "EQUAL"});
                                    me.prcexttelinfo(filters);
                                }
                            } else {
                                if (response !== undefined && response !== null && response.status === 403) {
                                    IncomeBank.tamin.window.MessageBox.showError('خطای دسترسی', 'کاربر گرامی شما به این عملیات دسترسی ندارید');
                                    return;
                                }
                                var resp = Ext.decode(response.responseText);

                                if (resp !== null && resp !== undefined && resp.data !== null && resp.data !== undefined &&
                                    resp.data.entity !== null && resp.data.entity !== undefined && resp.data.entity !== '') {
                                    IncomeBank.tamin.window.MessageBox.showError('خطا', resp.data.entity);
                                } else if (resp !== null && resp !== undefined && resp.data !== null && resp.data !== undefined) {
                                    IncomeBank.tamin.window.MessageBox.showError('خطا', resp.data);
                                } else {
                                    IncomeBank.tamin.window.MessageBox.showError('خطا', 'خطا در عملیات');
                                }
                            }
                            // failure: function (response, opts) {
                            //     Ext.getBody().unmask();
                            //     InsuranceTechnical.tamin.window.MessageBox.showInfo('پیام سیستم', Ext.JSON.decode(response.responseText).data.message);
                            // }
                        }
                    });

                }

            });
        } else {
            var filters = [];

            var date = Ext.getCmp('telInfo-compMdate').getValue();
            var year = IncomeBank.tamin.PDate.getFullYear(date).toString();
            var month = IncomeBank.tamin.PDate.getMonth(date) + 1;
            if (month.toString().length === 1)
                month = '0' + month;

            // var brhCode = Ext.getCmp('telInfo-brchCode').getValue();
            var brhCode = IncomeBank.getApplication().getCache('brchCode');

            filters.push({property: 'drmdTelInfoPK.year', value: year, operator: "EQUAL"});
            filters.push({property: 'drmdTelInfoPK.month', value: month, operator: "EQUAL"});
            filters.push({property: 'drmdTelInfoPK.brhCode', value: brhCode, operator: "EQUAL"});

            if (Ext.getCmp('telInfo-day').getValue() !== null) {
                filters.push({
                    property: 'drmdTelInfoPK.day',
                    value: Ext.getCmp('telInfo-day').getValue(),
                    operator: "EQUAL"
                });
            }

            Ext.Ajax.request({
                url: IncomeBank.helper.Urls.getUrl("drmdTelInfo") + '?filter=' + JSON.stringify(filters),
                method: 'GET',
                callback: function (options, success, response) {
                    if (success) {
                        var resp = Ext.JSON.decode(response.responseText);
                        if (resp.data.total !== 0) {
                            Ext.Msg.confirm('پیام سیستم', 'استخراج اطلاعات آمار وصولی قبلا انجام گرفته  است ، آیا مجددا تکرار شود؟', function (id, value) {
                                if (id === 'yes') {
                                    //mohasebe
                                    filters.push({property: 'ghaty', value: ghaty, operator: "EQUAL"});
                                    me.prcexttelinfo(filters);
                                }

                            });

                        } else {
                            //mohasebe
                            filters.push({property: 'ghaty', value: ghaty, operator: "EQUAL"});
                            me.prcexttelinfo(filters);
                        }
                    } else {
                        if (response !== undefined && response !== null && response.status === 403) {
                            IncomeBank.tamin.window.MessageBox.showError('خطای دسترسی', 'کاربر گرامی شما به این عملیات دسترسی ندارید');
                            return;
                        }
                        var resp = Ext.decode(response.responseText);

                        if (resp !== null && resp !== undefined && resp.data !== null && resp.data !== undefined &&
                            resp.data.entity !== null && resp.data.entity !== undefined && resp.data.entity !== '') {
                            IncomeBank.tamin.window.MessageBox.showError('خطا', resp.data.entity);
                        } else if (resp !== null && resp !== undefined && resp.data !== null && resp.data !== undefined) {
                            IncomeBank.tamin.window.MessageBox.showError('خطا', resp.data);
                        } else {
                            IncomeBank.tamin.window.MessageBox.showError('خطا', 'خطا در عملیات');
                        }
                    }
                }
            });

        }
    },
    prcexttelinfo: function (filters) {
        var me = this;
        var mainGrid = Ext.getCmp('telInfoGrid');
        var grid = Ext.getCmp('telInfoDetGrid');
        Ext.getBody().mask('سيستم در حال استخراج تلگراف وصولي مي باشد...');
        Ext.Ajax.request({
            url: IncomeBank.helper.Urls.getUrl("prcexttelinfo") + '?filter=' + JSON.stringify(filters),
            method: 'GET',
            callback: function (options, success, response) {
                if (success) {

                    var resp = Ext.JSON.decode(response.responseText);
                    var result = resp.data;
                    // success
                    if (result === true) {
                        Ext.getBody().unmask();
                        IncomeBank.tamin.window.MessageBox.showInfo('پیام سیستم', 'محاسبه تلگراف وصولی با موفقیت انجام شد.');
                        mainGrid.getStore().clearFilter();

                        var bankFilters = [];

                        var date = Ext.getCmp('telInfo-compMdate').getValue();
                        var year = IncomeBank.tamin.PDate.getFullYear(date).toString();
                        var month = IncomeBank.tamin.PDate.getMonth(date) + 1;
                        if (month.toString().length === 1)
                            month = '0' + month;

                        var brhCode = Ext.getCmp('telInfo-brchCode').getValue();

                        bankFilters.push({property: 'compMdate', value: year + month, operator: "EQUAL"});
                        bankFilters.push({property: 'brhCode', value: brhCode, operator: "EQUAL"});

                        if (Ext.getCmp('telInfo-day').getValue() !== null) {
                            bankFilters.push({
                                property: 'day',
                                value: Ext.getCmp('telInfo-day').getValue(),
                                operator: "EQUAL"
                            });
                        }
                        mainGrid.getStore().addFilter(bankFilters);
                        mainGrid.getStore().load({
                            callback: function () {

                                var size = me.getViewModel().getStore('telInfo').getCount();
                                if (size !== 0) {

                                    var totalAmount = mainGrid.getStore().getAt(0).data.totalAmount;
                                    var totalCurrOldAmount = mainGrid.getStore().getAt(0).data.totalCurrOldAmount;

                                    me.getViewModel().set('telInfoData.sumAmt', totalAmount.toString().replace(/.(?=(?:.{3})+$)/g, '$&,'));
                                    me.getViewModel().set('telInfoData.sum', totalCurrOldAmount.toString().replace(/.(?=(?:.{3})+$)/g, '$&,'));

                                    var sorters = [];
                                    sorters.push({
                                        property: grid.getStore().sorters.items[0].config.property,
                                        direction: grid.getStore().sorters.items[0].config.direction
                                    });

                                    Ext.Ajax.request({
                                        url: IncomeBank.helper.Urls.getUrl("bankTelInfo") + '?filter=' + JSON.stringify(bankFilters) + '&sort=' + JSON.stringify(sorters),
                                        method: 'GET',
                                        callback: function (options, success, response) {
                                            if (success) {

                                                var resp = Ext.JSON.decode(response.responseText);
                                                var result = [];
                                                for (var index = 0; index <= 5; index++) {
                                                    result.push(resp.data.list[index]);
                                                }
                                                me.getViewModel().set('telInfoData.ghaty', resp.data.list[6].description);

                                                grid.getStore().setData(result);
                                            }
                                        }
                                    });

                                }
                            }
                        });
                    } else {
                        Ext.getBody().unmask();
                        IncomeBank.tamin.window.MessageBox.showError('خطا', 'خطا در استخراج اطلاعات.');
                    }

                } else {
                    //   IncomeBank.tamin.window.MessageBox.showError('خطا', JSON.parse(response.responseText).data.message);
                    Ext.getBody().unmask();
                    if (response !== undefined && response !== null && response.status === 403) {
                        IncomeBank.tamin.window.MessageBox.showError('خطای دسترسی', 'کاربر گرامی شما به این عملیات دسترسی ندارید');
                        return;
                    }
                    var resp = Ext.decode(response.responseText);

                    if (resp !== null && resp !== undefined && resp.data !== null && resp.data !== undefined) {
                        IncomeBank.tamin.window.MessageBox.showError('خطا', resp.data.message);
                    } else {
                        IncomeBank.tamin.window.MessageBox.showError('خطا', 'خطا در عملیات');
                    }
                    // if (resp !== null && resp !== undefined && resp.data !== null && resp.data !== undefined &&
                    //     resp.data.entity !== null && resp.data.entity !== undefined && resp.data.entity !== '') {
                    //     IncomeBank.tamin.window.MessageBox.showError('خطا', resp.data.entity);
                    // } else if (resp !== null && resp !== undefined && resp.data !== null && resp.data !== undefined) {
                    //     IncomeBank.tamin.window.MessageBox.showError('خطا', resp.data);
                    // } else {
                    //     IncomeBank.tamin.window.MessageBox.showError('خطا', 'خطا در عملیات');
                    // }

                }
            }
        });
    },
    onReportButton: function () {

        var me = this;
        var day = Ext.getCmp('telInfo-day').getValue();
        if (!Ext.getCmp('telInfo_formId').isFormValid()) {
            IncomeBank.tamin.window.MessageBox.showError('خطا', 'لطفا ابتدا سال و ماه و شعبه را انتخاب نمایید.');
            return;
        }

        if (Ext.getCmp('telInfo-day').getValue() !== null && Ext.getCmp('telInfo-day').getValue() > 31) {
            IncomeBank.tamin.window.MessageBox.showInfo('پیام سیستم', 'تاریخ روز نمی تواند بیشتر از 31 باشد');
            return;
        }

        // if (day == "") {
        //     IncomeBank.tamin.window.MessageBox.showError('خطا', "برای نمایش گزارش روز می بایست پر باشد");
        //     return;
        // }
        var filter = [];

        var date = Ext.getCmp('telInfo-compMdate').getValue();
        var year = IncomeBank.tamin.PDate.getFullYear(date).toString();
        var month = IncomeBank.tamin.PDate.getMonth(date) + 1;
        if (month.toString().length === 1)
            month = '0' + month;

        var brhCode = Ext.getCmp('telInfo-brchCode').getValue();

        filter.push({property: 'compMdate', value: year + month, operator: "EQUAL"});
        filter.push({property: 'brhCode', value: IncomeBank.getApplication().getCache('brchCode'), operator: "EQUAL"});

        if (Ext.getCmp('telInfo-day').getValue() !== null) {
            filter.push({property: 'day', value: Ext.getCmp('telInfo-day').getValue(), operator: "EQUAL"});
        }

        var stringFilters = JSON.stringify(filter);
        var store = me.getViewModel().getStore('telInfo');
        var sorters = [];
        sorters.push({
            property: store.sorters.items[0].config.property,
            direction: store.sorters.items[0].config.direction
        });

        var url = IncomeBank.helper.Urls.getUrl('telReport') + '?filter=' + stringFilters + '&sort=' + JSON.stringify(sorters);

        var win = window.
        open(url, '_blank');
        win.focus();


    },
    onDetailButton: function () {
//        this.redirectTo("diffDetail");
        if (!Ext.getCmp('telInfo_formId').isFormValid()) {
            IncomeBank.tamin.window.MessageBox.showError('خطا', 'لطفا ابتدا سال و ماه و شعبه را انتخاب نمایید.');
            return;
        }

        if (Ext.getCmp('telInfo-day').getValue() !== null && Ext.getCmp('telInfo-day').getValue() > 31) {
            IncomeBank.tamin.window.MessageBox.showInfo('پیام سیستم', 'تاریخ روز نمی تواند بیشتر از 31 باشد');
            return;
        }
        var date = Ext.getCmp('telInfo-compMdate').getValue();
        var year = IncomeBank.tamin.PDate.getFullYear(date).toString();
        var month = IncomeBank.tamin.PDate.getMonth(date) + 1;
        if (month.toString().length === 1)
            month = '0' + month;

        if (Ext.getCmp('telInfo-day').getValue() !== null) {
            var day = Ext.getCmp('telInfo-day').getValue();
        }

        var brhCode = Ext.getCmp('telInfo-brchCode').getValue();

        IncomeBank.getApplication().addCache('yearMonth', year + month);
        IncomeBank.getApplication().addCache('day', day);
        IncomeBank.getApplication().addCache('brchCode', brhCode);

        var win = this.lookupReference('diffDetail');
        if (!win) {
            win = Ext.create('IncomeBank.view.daramadBank.DiffDetail');
            this.getView().add(win);
        }
        win.show();

    },
    onRiaziButton: function () {


        if (!Ext.getCmp('telInfo_formId').isFormValid()) {
            IncomeBank.tamin.window.MessageBox.showError('خطا', 'لطفا ابتدا سال و ماه و شعبه را انتخاب نمایید.');
            return;
        }
        var filter = [];


        var date = Ext.getCmp('telInfo-compMdate').getValue();
        var year = IncomeBank.tamin.PDate.getFullYear(date).toString();
        var month = IncomeBank.tamin.PDate.getMonth(date) + 1;
        if (month.toString().length === 1)
            month = '0' + month;

        var brhCode = Ext.getCmp('telInfo-brchCode').getValue();

        filter.push({property: 'yearMonth', value: year + month, operator: "EQUAL"});
        filter.push({property: 'brchCode', value: brhCode, operator: "EQUAL"});

        var stringFilters = JSON.stringify(filter);

        var url = IncomeBank.helper.Urls.getUrl('riaziList') + '?filter=' + stringFilters;

        var win = window.open(url, '_blank');
        win.focus();
    },
    onXMLButton: function () {

        var me = this;
        if (!Ext.getCmp('telInfo_formId').isFormValid()) {
            IncomeBank.tamin.window.MessageBox.showError('خطا', 'لطفا ابتدا سال و ماه و شعبه را انتخاب نمایید.');
            return;
        }
        var filter = [];

        var date = Ext.getCmp('telInfo-compMdate').getValue();
        var year = IncomeBank.tamin.PDate.getFullYear(date).toString();
        var month = IncomeBank.tamin.PDate.getMonth(date) + 1;
        if (month.toString().length === 1)
            month = '0' + month;

        var brhCode = Ext.getCmp('telInfo-brchCode').getValue();

        filter.push({property: 'year', value: year, operator: "EQUAL"});
        filter.push({property: 'month', value: month, operator: "EQUAL"});
        filter.push({property: 'brchCode', value: brhCode, operator: "EQUAL"});

        var stringFilters = JSON.stringify(filter);

        Ext.Ajax.request({
            url: IncomeBank.helper.Urls.getUrl("gatherExeIns") + '?filter=' + stringFilters,
            method: 'GET',
            callback: function (options, success, response) {
                if (success) {


                    me.showXML(stringFilters);


                } else {

                    if (response !== undefined && response !== null && response.status === 403) {
                        IncomeBank.tamin.window.MessageBox.showError('خطای دسترسی', 'کاربر گرامی شما به این عملیات دسترسی ندارید');
                        return;
                    }
                    var resp = (response.responseText);

                    if (resp !== null && resp !== undefined && resp.data !== null && resp.data !== undefined &&
                        resp.data.entity !== null && resp.data.entity !== undefined && resp.data.entity !== '') {
                        IncomeBank.tamin.window.MessageBox.showError('خطا', resp.data.entity);
                    } else if (resp !== null && resp !== undefined) {
                        IncomeBank.tamin.window.MessageBox.showError('خطا', resp);
                    } else {
                        IncomeBank.tamin.window.MessageBox.showError('خطا', 'خطا در عملیات');
                    }
                }
            }
        });


    },
    showXML: function (stringFilters) {


        var grid = Ext.getCmp('telInfoDetGrid');
        var data = grid.getStore().getData();

        var sum = [];
        for (var i = 0; i < 6; i++) {
            sum.push({property: 'sum' + (i + 4), value: data.items[i].data.amount});
        }

        var url = IncomeBank.helper.Urls.getUrl('telInfoXml') + '?filter=' + stringFilters + '&value=' + JSON.stringify(sum);
        ;
        var win = window.open(url, '_blank');
        win.focus();

    }
});
