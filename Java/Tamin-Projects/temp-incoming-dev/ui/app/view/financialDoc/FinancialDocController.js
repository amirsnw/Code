Ext.define('IncomeBank.view.financialDoc.FinancialDocController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.financialDocController',
    init: function () {
        Ext.getCmp('yearMonth').setValue('14010801');
        this.onSearch();
    },
    onSearch: function (button) {
        var me = this;
        var form;
        if (button) {
            form = button.up('form').getForm();
        } else {
            form = me.getView().down('tform').getForm();
        }
        var searchValues = form.getValues();
        var store = me.getViewModel().getStore('financialDoc');
        if (!form.isValid()) {
            IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', 'لطفا سال و ماه را انتخاب نمایید');
            return;
        }
        store.clearFilter();
        var filters = [];
        Ext.Object.each(searchValues, function (property, value) {
            if (value !== '') {
                if (property === 'yearMonth') {
                    value = value.split('/');
                    value = IncomeBank.tamin.PDate.GregorianToPersian(value[0], value[1], value[2]);
                    filters.push({
                        property: 'daramadYear',
                        value: value[0].toString(),
                        operator: 'EQUAL'
                    });
                    filters.push({
                        property: 'daramadMonth',
                        value: value[1] < 10 ? '0' + value[1] : value[1],
                        operator: 'EQUAL'
                    });
                }
            }
        });
        store.addFilter(filters);

        var url = IncomeBank.helper.Urls.getUrl('FinancialDocSummery') +
            "?filters=" + JSON.stringify(filters);
        Ext.getBody().mask('لطفا منتظر بمانید...');
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            success: function (response, opts) {
                Ext.getBody().unmask();
                var summery = Ext.JSON.decode(response.responseText).data;
                summery.creditAmount = summery.creditAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                summery.debtAmount = summery.debtAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                me.getViewModel().set('financialDocSummery', summery)
            },
            failure: function (response, opts) {
                Ext.getBody().unmask();
                IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', 'خطا در اجرای فرایند!');
            }
        });
    },
    onIssuanceButton: function () {
        var store = this.getViewModel().getStore('financialDoc');
        var picker = Ext.getCmp('yearMonth');
        var year = picker.getYear();
        var month = picker.getMonth();
        var url = IncomeBank.helper.Urls.getUrl('FinancialIssuance')
            + '/' + year + '/' + month;
        Ext.getBody().mask('لطفا منتظر بمانید...');
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            success: function (response, opts) {
                Ext.getBody().unmask();
                store.reload();
                IncomeBank.tamin.window.MessageBox.showInfo('پیام سیستم', Ext.JSON.decode(response.responseText).data);
            },
            failure: function (response, opts) {
                Ext.getBody().unmask();
                try {
                    IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', response.responseText);
                } catch(e) {
                    IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', 'خطا در اجرای فرایند!');
                }
            }
        });
    },
    onFinancialSubmitButton: function () {
        var filter = [];
        var yearMonth = Ext.getCmp('yearMonth').getValue();
        yearMonth = IncomeBank.tamin.PDate.gregorianDateToPersianArray(yearMonth);
        filter.push({
            property: 'daramadYear',
            value: yearMonth[0].toString(),
            operator: 'EQUAL'
        });
        filter.push({
            property: 'daramadMonth',
            value: yearMonth[1] < 10 ? '0' + yearMonth[1] : yearMonth[1],
            operator: 'EQUAL'
        });
        var store = this.getViewModel().getStore('financialDoc');
        var picker = Ext.getCmp('yearMonth');
        var year = picker.getYear();
        var month = picker.getMonth();
        var url = IncomeBank.helper.Urls.getUrl('FinancialSubmit');
        Ext.getBody().mask('لطفا منتظر بمانید...');
        Ext.Ajax.request({
            url: url,
            method: 'POST',
            jsonData: {
                filters: filter
            },
            success: function (response, opts) {
                Ext.getBody().unmask();
                IncomeBank.tamin.window.MessageBox.showInfo('پیام سیستم',
                    '<div style="direction:ltr;">Error => ' + Ext.JSON.decode(response.responseText).data.serviceErrorList.join('<br/><br/>Error => ')
                    + '</div><br><hr>' + '<div style="direction:ltr;">Messages => ' + Ext.JSON.decode(response.responseText).data.serviceMessageList.join('<br/><br/>Mes => ')
                    + '</div>');
            },
            failure: function (response, opts) {
                Ext.getBody().unmask();
                IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', 'ارتباط برقرار نشد، لطفا مجددا تلاش نمایید...');
            }
        });
    },
});
