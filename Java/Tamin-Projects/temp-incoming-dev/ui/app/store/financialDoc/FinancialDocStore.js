Ext.define('IncomeBank.store.financialDoc.FinancialDocStore', {
    extend: 'Ext.data.Store',
    model: 'IncomeBank.model.financialDoc.FinancialDoc',
    remoteFilter: true,
    pageSize: 50,
    remoteSort: false,
    autoLoad: false,
});
