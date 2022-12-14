Ext.define('IncomeBank.store.baseinfo.CustomersType', {
    extend: 'Ext.data.Store',
    requires: ['IncomeBank.model.baseinfo.CustomersType'],
    model: 'IncomeBank.model.baseinfo.CustomersType',
    remoteFilter: true,
    pageSize: 10,
    remoteSort: true,
    autoLoad: false,
    sorters: 'mastcusttype'
});


