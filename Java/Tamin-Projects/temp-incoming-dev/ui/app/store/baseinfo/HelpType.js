Ext.define('IncomeBank.store.baseinfo.HelpType', {
    extend: 'Ext.data.Store',
    requires: ['IncomeBank.model.baseinfo.HelpType'],
    model: 'IncomeBank.model.baseinfo.HelpType',
    remoteFilter: true,
    pageSize: 10,
    remoteSort: true,
    autoLoad: false,
    sorters: 'code'
});


