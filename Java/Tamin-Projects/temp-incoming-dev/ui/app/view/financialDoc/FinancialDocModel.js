Ext.define('IncomeBank.view.financialDoc.FinancialDocModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.financialDocModel',
    stores: {
        financialDoc: {xclass: 'IncomeBank.store.financialDoc.FinancialDocStore'},
    }
});
