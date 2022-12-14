Ext.define('IncomeBank.store.baseinfo.PayStep', {
    extend: 'Ext.data.Store',
    requires: ['IncomeBank.model.baseinfo.PayStep'],
    model: 'IncomeBank.model.baseinfo.PayStep',
    remoteFilter: false,
    pageSize: 10,
    remoteSort: false,
    autoLoad: false
});