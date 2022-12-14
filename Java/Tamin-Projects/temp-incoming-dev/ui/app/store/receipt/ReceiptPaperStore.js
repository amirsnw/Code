Ext.define('IncomeBank.store.receipt.ReceiptPaperStore', {
    extend: 'Ext.data.Store',
    model: 'IncomeBank.model.receipt.ReceiptPaper',
    remoteFilter: true,
    pageSize: 10,
    remoteSort: false,
    autoLoad: true
});
