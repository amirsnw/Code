Ext.define('IncomeBank.store.telegraph.TelSumDaily', {
    extend: 'Ext.data.Store',
    model: 'IncomeBank.model.telegraph.TelSumDaily',
    remoteFilter: true,
    pageSize: 10,
    remoteSort: false,
    autoLoad: true
});
