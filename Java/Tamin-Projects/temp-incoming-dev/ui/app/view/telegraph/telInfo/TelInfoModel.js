Ext.define('IncomeBank.view.telegraph.telInfo.TelInfoModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.telInfoModel',
    stores: {
        branch: {xclass: 'IncomeBank.store.baseinfo.Branches'},
        telInfo: {xclass: 'IncomeBank.store.telegraph.TelInfo'},
        bankTelInfo: {xclass: 'IncomeBank.store.telegraph.BankTelInfo'},
        diffDetail: {xclass: 'IncomeBank.store.telegraph.DiffDetail'}
    }

});
