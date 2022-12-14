Ext.define('IncomeBank.store.baseinfo.OperationBanksPension', {
    extend: 'Ext.data.Store',
    requires: ['IncomeBank.model.baseinfo.OperationBanksPension'],
    model: 'IncomeBank.model.baseinfo.OperationBanksPension',
    remoteFilter: false,
    pageSize: 10,
    remoteSort: false,
    autoLoad: false
});


