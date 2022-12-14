Ext.define('IncomeBank.store.baseinfo.OperationBanks', {
    extend: 'Ext.data.Store',
    requires: ['IncomeBank.model.baseinfo.OperationBank'],
    model: 'IncomeBank.model.baseinfo.OperationBank',
    remoteFilter: false,
    pageSize: 10,
    remoteSort: false,
    autoLoad: false
});


