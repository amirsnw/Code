Ext.define('IncomeBank.view.telegraph.telSumDaily.TelSumDailyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.telSumDailyController',
    init: function () {
        var x = IncomeBank.tamin.helpers.Persian.gregorianToPersian(new Date()).split("/").pop();
        var d = new Date();
        d.setDate(d.getDate() - x + 1);
        Ext.getCmp('orderDateFrom').setValue(d);
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
        var store = this.getViewModel().getStore('telSumDaily');
        store.clearFilter();
        if (!form.isValid()) {
            IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', 'لطفا خطاهای مشخص شده را اصلاح نمایید');
            return;
        }
        var filters = [];
        Ext.Object.each(searchValues, function (property, value) {
            if (value !== '') {
                var i = filters.length;
                switch (property) {
                    case 'orderDateFrom':
                        filters.push({
                            id: i,
                            property: 'orderDate',
                            value: IncomeBank.tamin.helpers.Persian.gregorianToPersian(new Date(searchValues.orderDateFrom)).replace(/\//g, ''),
                            operator: 'AFTER'
                        });
                        break;
                    case 'orderDateTo':
                        filters.push({
                            id: i,
                            property: 'orderDate',
                            value: IncomeBank.tamin.helpers.Persian.gregorianToPersian(new Date(searchValues.orderDateTo)).replace(/\//g, ''),
                            operator: 'BEFORE'
                        });
                        break;
                    case 'brhCode':
                        filters.push({
                            property: 'brhCode',
                            value: value,
                            operator: 'EQUAL'
                        });
                        break;
                    case 'edareCode':
                        filters.push({
                            property: 'edareCode',
                            value: value,
                            operator: 'EQUAL'
                        });
                        break;
                }
            }
        });
        store.addFilter(filters);

        filters.forEach(function (item) {
            delete item.id;
        });

        var url = IncomeBank.helper.Urls.getUrl('telDailySummery') +
            "?filters=" + JSON.stringify(filters);
        Ext.getBody().mask('لطفا منتظر بمانید...');
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            success: function (response, opts) {
                Ext.getBody().unmask();
                var summery = Ext.JSON.decode(response.responseText).data;
                me.getViewModel().set('sumAmount', summery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
            },
            failure: function (response, opts) {
                Ext.getBody().unmask();
                IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', 'خطا در اجرای فرایند!');
            }
        });
    },
    onShowAll: function (button) {
        var store = this.getViewModel().getStore('telSumDaily');
        store.clearFilter();
        button.up('form').getForm().reset();
    },
    onExcel: function (btn) {

        var store = this.getViewModel().getStore('telSumDaily');
        if(store.getFilters().length === 0){
            IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', 'لطفا اول جستجو انجام شود');
            return;
        }
        fetch(IncomeBank.helper.Urls.getUrl('ExcelExport') + this.getStringFilter(store.getFilters().items), {
            headers: {
                'Authorization': 'Bearer ' + IncomeBank.helper.TokenStorage.retrieve()
            }
        })
            .then(resp => resp.blob()
    )
    .
        then(blob => {
            const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = 'گزارش سرجمع وصولی روزانه.xls';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .
        catch(() => alert('oh no!')
    )
        ;

    },
    getStringFilter: function (item) {
        var filters = "";
        for (var i = 0; i <= item.length - 1; i++) {
            if (i === 0) {
                filters += "?filter=[";
            }
            filters += "{\"property\":\"" + item[i].config.property.toString() + "\"," + "\"value\":\"" + (item[i].config.value != null ? item[i].config.value.toString() : "0") + "\"," + "\"operator\":\"" + item[i].config.operator.toString() + "\"}";
            if (i < item.length - 1) {
                filters += ",";
            } else {
                filters += "]";
            }
        }
        return filters;
    },
});
