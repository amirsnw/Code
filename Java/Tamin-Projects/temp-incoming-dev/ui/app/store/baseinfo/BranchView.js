Ext.define('IncomeBank.store.baseinfo.BranchView', {
    extend: 'Ext.data.Store',
    model: 'IncomeBank.model.baseinfo.BranchView',
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
