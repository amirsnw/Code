Ext.define('IncomeBank.store.telegraph.DiffDetail', {
    extend: 'Ext.data.Store',
    requires: ['IncomeBank.model.telegraph.DiffDetail'],
    model: 'IncomeBank.model.telegraph.DiffDetail',
    remoteFilter: true,
    pageSize: 10,
    remoteSort: true,
    autoLoad: false

});
