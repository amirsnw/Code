Ext.define('IncomeBank.store.baseinfo.IsuStatus', {
    extend: 'Ext.data.Store',
    requires: ['IncomeBank.model.baseinfo.IsuStatus'],
    model: 'IncomeBank.model.baseinfo.IsuStatus',
    remoteFilter: true,
    pageSize: 10,
    remoteSort: true,
    sortOnLoad: true,
    autoLoad: false,
    sorters: [{
            property: 'isustatcode',
            direction: 'ASC'
        }]
});
