Ext.define('IncomeBank.store.baseinfo.Provinces', {
    extend: 'Ext.data.Store',
    requires: ['IncomeBank.model.baseinfo.Provinces'],
    model: 'IncomeBank.model.baseinfo.Provinces',
    remoteFilter: true,
    pageSize: 10,
    remoteSort: true,
    sortOnLoad: true,
    autoLoad: false,
    sorters: [{
            property: 'provinceCode',
            direction: 'ASC'
        }]
});
