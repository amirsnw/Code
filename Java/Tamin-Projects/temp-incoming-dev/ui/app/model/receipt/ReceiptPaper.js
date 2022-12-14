Ext.define('IncomeBank.model.receipt.ReceiptPaper', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: IncomeBank.helper.Urls.getUrl('ReceiptPaper'),
        reader: {
            type: 'json',
            rootProperty: 'data.list',
            totalProperty: 'data.total'
        }
    }
});
