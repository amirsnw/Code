Ext.define('IncomeBank.store.baseinfo.OnlinePayStatus', {
    extend: 'Ext.data.Store',
    requires: ['IncomeBank.model.baseinfo.OnlinePayStatus'],
    model: 'IncomeBank.model.baseinfo.OnlinePayStatus',
    remoteFilter: false,
    pageSize: 10,
    remoteSort: false,
    autoLoad: false
});


