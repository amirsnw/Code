Ext.define('IncomeBank.store.baseinfo.BankError', {
    extend: 'Ext.data.Store',
    requires: ['IncomeBank.model.baseinfo.BankError'],
    model: 'IncomeBank.model.baseinfo.BankError',
    remoteFilter: true,
    pageSize: 10,
    remoteSort: true,
    autoLoad: false,
    sorters: 'errorCode'
});


