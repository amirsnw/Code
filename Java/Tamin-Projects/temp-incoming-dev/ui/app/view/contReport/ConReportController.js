Ext.define('IncomeBank.view.contReport.ContController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contController',
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
        var store = me.getViewModel().getStore('contReportStore');
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
                        property: 'year',
                        value: value[0].toString(),
                        operator: 'EQUAL'
                    });
                    filters.push({
                        property: 'month',
                        value: value[1] < 10 ? '0' + value[1] : value[1],
                        operator: 'EQUAL'
                    });
                } else {
                    filters.push({
                        property: property,
                        value: value,
                        operator: 'EQUAL'
                    });
                }
            }
        });
        store.addFilter(filters);

        var url = IncomeBank.helper.Urls.getUrl('ContradictionReportSummery') +
            "?filters=" + JSON.stringify(filters);
        Ext.getBody().mask('لطفا منتظر بمانید...');
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            success: function (response, opts) {
                Ext.getBody().unmask();
                var summery = Ext.JSON.decode(response.responseText).data;
                me.getViewModel().set('contReportSummery.diffAmount', summery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
            },
            failure: function (response, opts) {
                Ext.getBody().unmask();
                IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', 'خطا در اجرای فرایند!');
            }
        });
    }
});
