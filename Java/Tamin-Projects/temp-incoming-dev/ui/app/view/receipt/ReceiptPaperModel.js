Ext.define('IncomeBank.view.receipt.ReceiptPaperModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.receiptPaperModel',
    stores: {
        branchView: {xclass: 'IncomeBank.store.baseinfo.BranchView'},
        receiptPaper: {xclass: 'IncomeBank.store.receipt.ReceiptPaperStore'},
        detailReceiptPaper: {xclass: 'IncomeBank.store.receipt.LocalDetailReceiptPaperStore'},
        Workshop: {xclass: 'IncomeBank.store.baseinfo.Workshop'},
    }
});
