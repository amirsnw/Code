Ext.define('IncomeBank.store.baseinfo.Branches', {
    extend: 'Ext.data.Store',
    requires: ['IncomeBank.model.baseinfo.Branches'],
    model: 'IncomeBank.model.baseinfo.Branches',


    remoteFilter: true,
    pageSize: 10,
    remoteSort: true,
    sortOnLoad: true,
    autoLoad: true,
    // sorters:[{
    //         property:'brhCode',
    //         direction:'ASC'
    // }]
});
