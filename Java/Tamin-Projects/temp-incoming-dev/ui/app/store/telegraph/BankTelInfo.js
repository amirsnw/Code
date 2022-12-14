Ext.define('IncomeBank.store.telegraph.BankTelInfo', {
    extend: 'Ext.data.Store',
    requires: ['IncomeBank.model.telegraph.BankTelInfo'],
    model: 'IncomeBank.model.telegraph.BankTelInfo',
    remoteFilter: true,
    pageSize: 10,
    remoteSort: false,
    autoLoad: true,
    sorters: [
        {
            property: 'rowNumber',
            direction: 'ASC'
        }

    ]

});
