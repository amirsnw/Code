Ext.define('IncomeBank.view.receipt.ReceiptPaperController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.receiptPaperController',
    init: function () {
        var x = IncomeBank.tamin.helpers.Persian.gregorianToPersian(new Date()).split("/").pop();
        var d = new Date();
        d.setDate(d.getDate() - x + 1);
        Ext.getCmp('orderDateFrom').setValue(d);
        this.onSearch();
    },
    onSearch: function (button) {
        var me = this;
        var filters = [];
        var form;
        if (button) {
            form = button.up('form').getForm();
        } else {
            form = me.getView().down('tform').getForm();
        }
        var searchValues = form.getValues();
        var store = me.getViewModel().getStore('receiptPaper');
        if (!form.isValid()) {
            IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', 'لطفا تاریخ وصول را انتخاب نمایید');
            return;
        }
        store.clearFilter();
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
                    case 'brchCode':
                        filters.push({
                            property: 'branchCode',
                            value: value,
                            operator: 'EQUAL'
                        });
                        break;
                    case 'orderNo':
                        filters.push({
                            property: 'orderNo',
                            value: value,
                            operator: 'EQUAL'
                        });
                        break;
                    case 'customerId':
                        filters.push({
                            property: 'customerId',
                            value: value,
                            operator: 'EQUAL'
                        });
                        break;
                    case 'governmentFlag':
                        filters.push({
                            property: 'governmentFlag',
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
        var url = IncomeBank.helper.Urls.getUrl('ReceiptPaperSummery') +
            "?filters=" + JSON.stringify(filters);
        Ext.getBody().mask('لطفا منتظر بمانید...');
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            success: function (response, opts) {
                Ext.getBody().unmask();
                var summery = Ext.JSON.decode(response.responseText).data;
                summery.governmentAmount = summery.governmentAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                summery.orderAmount = summery.orderAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                me.getViewModel().set('receiptPaperSummery', summery);
            },
            failure: function (response, opts) {
                Ext.getBody().unmask();
                IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', 'خطا در اجرای فرایند!');
            }
        });
    },
    onShowAll: function (button) {
        button.up('form').getForm().reset();
        this.onSearch(button);
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
    selectReceipt: function (grid, selection) {
        selection = selection.data;
        var details = [];
        details =[{
            orderType: selection.orderType1,
            orderAmount: selection.orderAmount1
        },
            {
                orderType: selection.orderType2,
                orderAmount: selection.orderAmount2
            },
            {
                orderType: selection.orderType3,
                orderAmount: selection.orderAmount3
            },
            {
                orderType: selection.orderType4,
                orderAmount: selection.orderAmount4
            },
            {
                orderType: selection.orderType5,
                orderAmount: selection.orderAmount5
            }];

        this.populateDetailReceiptGrid(details);
    },
    deSelectReceipt: function (grid, selection) {
        var detailReceiptPaperStore = this.getStore("detailReceiptPaper");
        detailReceiptPaperStore.loadData([],false);
    },
    onDownloadExcel: function (button) {
        var store = this.getViewModel().getStore('receiptPaper');
        var filters = [];
        for (var filter of store.getFilters().items) {
            filters.push({
                property: filter._property,
                operator: filter._operator,
                value: filter._value,
            })
        }
        var url = IncomeBank.helper.Urls.getUrl('getReceiptPaperExcel') +
            "?filters=" + JSON.stringify(filters);
        Ext.create('IncomeBank.tamin.window.PdfViewer', {url: url}).download();
    },
    populateDetailReceiptGrid: function (details) {
        var me = this;
        var detailReceiptPaperStore = me.getStore("detailReceiptPaper");
        detailReceiptPaperStore.loadData([],false);

        details.forEach(function (item) {
            item.rowSeq = detailReceiptPaperStore.getCount() + 1;
            detailReceiptPaperStore.add(item);
        });
    },
});
