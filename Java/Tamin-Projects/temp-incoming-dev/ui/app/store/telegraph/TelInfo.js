Ext.define('IncomeBank.store.telegraph.TelInfo', {
    extend: 'Ext.data.Store',
    requires: ['IncomeBank.model.telegraph.TelInfo'],
    model: 'IncomeBank.model.telegraph.TelInfo',
    remoteFilter: true,
    //pageSize: 10,
    remoteSort: false,
    autoLoad: false,
    sorters: [
        {
            property: 'rowDescType',
            direction: 'ASC'
        }

    ]

});
