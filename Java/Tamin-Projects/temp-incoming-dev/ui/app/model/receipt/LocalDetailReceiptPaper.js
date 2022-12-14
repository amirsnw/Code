/**
 * Created by a_khalighi on 03/06/2022.
 */
Ext.define('IncomeBank.model.receipt.LocalDetailReceiptPaper', {
    extend: 'Ext.data.Model',
    fields:['rowSeq', 'detailType', 'detailAmount'],
    data:{},
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'items'
        }
    }
});

