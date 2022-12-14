/**
 * Created by a_khalighi on 03/06/2019.
 */
Ext.define('IncomeBank.store.receipt.LocalDetailReceiptPaperStore', {
    extend: 'Ext.data.Store',
    requires: ['IncomeBank.model.receipt.LocalDetailReceiptPaper'],
    model: 'IncomeBank.model.receipt.LocalDetailReceiptPaper',
    pageSize: 10,
    autoLoad: false,
    getRawRecords: function() {
        return Ext.Array.map(this.getData().getRange(), function(record){
            return record.data;
        });
    },
});
