Ext.define('IncomeBank.view.telegraph.telSumDaily.TelSumDailyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.telSumDailyModel',
    stores: {
        branchView: {xclass: 'IncomeBank.store.baseinfo.BranchView'},
        edareKol: {xclass: 'IncomeBank.store.baseinfo.EdareKol'},
        telSumDaily: {xclass: 'IncomeBank.store.telegraph.TelSumDaily'}
    }
});
