Ext.define('IncomeBank.store.baseinfo.IsuType', {
    extend: 'Ext.data.Store',
    requires: ['IncomeBank.model.baseinfo.IsuType'],
    model: 'IncomeBank.model.baseinfo.IsuType',
    remoteFilter: true,
    pageSize: 10,
    remoteSort: true,
    sortOnLoad: true,
    autoLoad: false,
    sorters: [{
            property: 'isutypecode',
            direction: 'ASC'
        }]
});
