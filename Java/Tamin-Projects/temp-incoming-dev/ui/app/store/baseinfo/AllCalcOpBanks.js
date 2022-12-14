Ext.define('IncomeBank.store.baseinfo.AllCalcOpBanks', {
    extend: 'Ext.data.Store',
    requires: ['IncomeBank.model.baseinfo.AllCalcOpBanks'],
    model: 'IncomeBank.model.baseinfo.AllCalcOpBanks',
    remoteFilter: false,
    pageSize: 10,
    remoteSort: false,
    autoLoad: false
});


