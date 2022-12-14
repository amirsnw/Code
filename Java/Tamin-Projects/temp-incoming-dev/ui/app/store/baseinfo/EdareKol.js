Ext.define('IncomeBank.store.baseinfo.EdareKol', {
    extend: 'Ext.data.Store',
    model: 'IncomeBank.model.baseinfo.EdareKol',
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
